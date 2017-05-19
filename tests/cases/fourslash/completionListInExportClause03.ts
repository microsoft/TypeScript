/// <reference path="fourslash.ts" />

////declare module "M1" {
////    export var abc: number;
////    export var def: string;
////}
////
////declare module "M2" {
////    export { abc/**/ } from "M1";
////}

// Ensure we don't filter out the current item.
goTo.marker();
verify.completionListContains("abc");
verify.completionListContains("def");
verify.not.completionListAllowsNewIdentifier();