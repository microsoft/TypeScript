/// <reference path="fourslash.ts" />

//// [|/*!
////  * This is a license or something
////  */
//// /// <reference types="node" />
//// /// <reference path="./a.ts" />
//// /// <amd-dependency path="./b.ts" />
//// /**
////  * This is a comment intended to be attached to this interface
////  */
//// export interface SomeInterface {
//// }
//// f1/*0*/();|]

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([
`/*!
 * This is a license or something
 */
/// <reference types="node" />
/// <reference path="./a.ts" />
/// <amd-dependency path="./b.ts" />

import { f1 } from "./module";

/**
 * This is a comment intended to be attached to this interface
 */
export interface SomeInterface {
}
f1();`
]);