{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  # Specify the packages you want in your development shell
  buildInputs = [
    pkgs.nodejs_22
    pkgs.nodePackages.pnpm
  ];
}
