{
  pkgs ? import <nixpkgs> {}
}: 

let 
  nixpkgshash = "99fef69887d41cf00432a3d3403ffd5a1b441372"; # rustc 1.86.0
  rustpkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/${nixpkgshash}.tar.gz") { };
in

pkgs.mkShell {
  buildInputs = with rustpkgs; [
    rustc
    cargo
    cargo-binstall
    gcc
    rustfmt
    clippy
    # compiling lux
    pkg-config
    openssl
    sqlite
    luajit
    libgpg-error
    gpgme
  ];
  shellHook = ''
  echo "rust: $(rustc --version)"
  echo "cargo: $(cargo --version)"
  export PATH=$PATH:''${CARGO_HOME:-~/.cargo/bin}

  which lux > /dev/null
  if [[ "$?" -ne 0 ]]; then
    cargo install lux-cli --locked | tee install.log
    if [[ "$?" -ne 0 ]]; then
      echo "BUILD FAIL"
      exit 1
    fi
  fi
  '';
  RUST_SRC_PATH = "${rustpkgs.rust.packages.stable.rustPlatform.rustLibSrc}";
  PKG_CONFIG_PATH = "${rustpkgs.openssl.dev}/lib/pkgconfig";
}