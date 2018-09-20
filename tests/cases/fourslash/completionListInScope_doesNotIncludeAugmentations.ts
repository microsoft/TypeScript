/// <reference path="fourslash.ts" />

// @Filename: /a.ts
////import * as self from "./a";
////
////declare module "a" {
////    export const a: number;
////}
////
/////**/

goTo.marker();
verify.not.completionListContains("a");
