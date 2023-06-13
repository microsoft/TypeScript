// @module: nodenext
// @outDir: ./dist
// @rootDir: .
// @filename: package.json
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  }
}
// @filename: index.ts
import * as me from "@this/package";

me.thing();

export function thing(): void {}
