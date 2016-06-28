/// <reference path='fourslash.ts'/>

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
