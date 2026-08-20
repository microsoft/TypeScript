//// [tests/cases/compiler/declarationEmitBundlerConditions.ts] ////

//// [package.json]
{
  "name": "pkg",
  "type": "module",
  "exports": {
    ".": {
      "import": "./index.js",
      "require": "./index.cjs"
    }
  }
}

//// [index.d.ts]
export declare class C {
  private p;
}

//// [index.d.cts]
export {};

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
