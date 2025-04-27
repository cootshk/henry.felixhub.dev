{
  description = "A very basic flake";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs?ref=nixpkgs-unstable";
    lux = {
      url = "github:nvim-neorocks/lux";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = { self, nixpkgs, lux, ... } @ inputs:
  let
    pkgs = nixpkgs.legacyPackages.x86_64-linux;
  in
  {

    # devShells = lux.devShells;
    devShells.x86_64-linux.lux = lux.devShells.x86_64-linux.default;
    devShells.x86_64-linux.default = pkgs.mkShell {
      name = "felixhub devshell";
      buildInputs = [
        lux.packages.x86_64-linux.default
        pkgs.luajit
        # Lua package deps
        pkgs.quictls
      ];
    };

  };
}
