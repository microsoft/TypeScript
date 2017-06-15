/// <reference path="fourslash.ts" />

////[|/*
//// * I'm a license or something
//// */
////f1/*0*/();|]

// @Filename: ambientModule.ts
//// declare module "ambient-module" {
////    export function f1();
////    export var v1;
//// }

verify.importFixAtPosition([
`/*
 * I'm a license or something
 */
import { f1 } from "ambient-module";

f1();`
]);
