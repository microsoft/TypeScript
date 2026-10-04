//// [tests/cases/compiler/nodeNextPackageSelfNameWithOutDirDeclDirComposite.ts] ////

//// [package.json]
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
//// [index.ts]
import * as me from "@this/package";

me.thing();

export function thing(): void {}


//// [index.js]
import * as me from "@this/package";
me.thing();
export function thing() { }


//// [index.d.ts]
export declare function thing(): void;
