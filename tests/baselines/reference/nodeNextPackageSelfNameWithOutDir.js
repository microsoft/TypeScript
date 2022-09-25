//// [tests/cases/compiler/nodeNextPackageSelfNameWithOutDir.ts] ////

//// [package.json]
{
  "name": "@this/package",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  }
}
//// [index.ts]
import * as me from "@this/package";

me.thing();

export function thing(): void {}


//// [index.js]
import * as me from "@this/package";
me.thing();
export function thing() { }
