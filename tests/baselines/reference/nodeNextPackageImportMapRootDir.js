//// [tests/cases/compiler/nodeNextPackageImportMapRootDir.ts] ////

//// [package.json]
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
//// [index.ts]
import * as me from "#dep";

me.thing();

export function thing(): void {}


//// [index.js]
import * as me from "#dep";
me.thing();
export function thing() { }
