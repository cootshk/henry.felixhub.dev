{
  pkgs ? import <nixpkgs> {}
}: 

let 
  nixpkgshash = "99fef69887d41cf00432a3d3403ffd5a1b441372"; # rustc 1.86.0
  rustpkgs = import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/${nixpkgshash}.tar.gz") { };
in

pkgs.mkShell {
  buildInputs = [
    rustpkgs.rustc
    rustpkgs.cargo
  ];
  shellHook = ''
  echo "rust: $(rustc --version)"
  echo "cargo: $(cargo --version)"
  '';
}