/// <reference path='fourslash.ts'/>

// @Filename: m1.ts
////export var foo: number = 1;
////export function bar() { return 10; }
////export function baz() { return 10; }

////declare module "M1" {
////    export var V;
////}
////
////declare module "M2" {
////    import { /**/ } from "M1"
////}

goTo.marker();
verify.completionListContains("V");
verify.not.completionListAllowsNewIdentifier();
