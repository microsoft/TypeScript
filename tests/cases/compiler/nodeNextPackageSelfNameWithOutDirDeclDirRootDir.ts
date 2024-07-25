// @module: nodenext
// @outDir: /pkg/dist
// @declarationDir: /pkg/types
// @declaration: true
// @rootDir: /pkg/src
// @filename: /pkg/package.json
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": {
      "default": "./dist/index.js",
      "types": "./types/index.d.ts"
    }
  }
}
// @filename: /pkg/src/index.ts
import * as me from "@this/package";

me.thing();

export function thing(): void {}
