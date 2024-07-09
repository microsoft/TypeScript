//// [tests/cases/conformance/ambient/ambientDeclarationsPatterns_merging3.ts] ////

//// [types.ts]
declare module "*.foo" {
  export interface OhNo { star: string }
}

//// [test.ts]
declare module "a.foo" {
  export interface OhNo { a: string }
}
import { OhNo } from "b.foo"
declare let ohno: OhNo;
ohno.a // oh no


//// [types.js]
//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
ohno.a; // oh no
