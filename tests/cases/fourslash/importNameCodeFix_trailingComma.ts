/// <reference path="fourslash.ts" />

// Bug #40219 only happens when existing import specifiers are unsorted.

// @Filename: index.ts
//// import {
////   T2,
////   T1,
//// } from "./types";
////
//// const x: T3/**/

// @Filename: types.ts
//// export type T1 = 0;
//// export type T2 = 0;
//// export type T3 = 0;

verify.importFixAtPosition([`import {
  T2,
  T1,
  T3,
} from "./types";

const x: T3`]);
