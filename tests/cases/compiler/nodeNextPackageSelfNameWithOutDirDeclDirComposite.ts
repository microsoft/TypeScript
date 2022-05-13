// @filename: tsconfig.json
{
  "compilerOptions": {
    "module": "nodenext",
    "outDir": "./dist",
    "declarationDir": "./types",
    "composite": true
  }
}
// @filename: package.json
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
// @filename: index.ts
import * as me from "@this/package";

me.thing();

export function thing(): void {}
