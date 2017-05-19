/// <reference path='fourslash.ts'/>

////declare module "M1" {
////    export var V;
////}
////var W;
////declare module "M2" {
////    export { /**/ } from "M1"
////}

goTo.marker();
verify.completionListContains("V");
verify.not.completionListContains("W");
verify.not.completionListAllowsNewIdentifier();