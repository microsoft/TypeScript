/// <reference path="fourslash.ts" />

//// [|/**
////  * This is a comment intended to be attached to this interface
////  */
//// export interface SomeInterface {
//// }
//// f1/*0*/();|]

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([
`import { f1 } from "./module";

/**
 * This is a comment intended to be attached to this interface
 */
export interface SomeInterface {
}
f1();`
]);
