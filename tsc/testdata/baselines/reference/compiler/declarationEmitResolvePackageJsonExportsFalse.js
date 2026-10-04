//// [tests/cases/compiler/declarationEmitResolvePackageJsonExportsFalse.ts] ////

//// [package.json]
{
  "name": "pkg",
  "type": "module",
  "exports": {
    ".": "./dist/index.js"
  }
}

//// [index.d.ts]
export declare class C {
  private p;
}

//// [index.d.ts]
export declare class C {
  private p;
}

//// [makeC.ts]
import { C } from "pkg";
export function makeC() {
  return new C();
}

//// [index.ts]
import { makeC } from "./makeC";
export const c = makeC();




//// [makeC.d.ts]
import { C } from "pkg";
export declare function makeC(): C;
//// [index.d.ts]
export declare const c: import("pkg").C;
