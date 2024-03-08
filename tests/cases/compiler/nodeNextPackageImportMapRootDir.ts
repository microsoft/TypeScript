// @module: nodenext
// @outDir: ./dist
// @rootDir: .
// @filename: package.json
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  },
  "imports": {
    "#dep": "./dist/index.js"
  }
}
// @filename: index.ts
import * as me from "#dep";

me.thing();

export function thing(): void {}
