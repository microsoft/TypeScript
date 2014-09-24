/// <reference path="fourslash.ts"/>

//// declare module "http" {
////    var x;
//// }
//// /**/

goTo.marker();
verify.not.completionListContains("http");
