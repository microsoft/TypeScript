/// <reference path="fourslash.ts"/>

//// declare module "http" {
////    var x;
////    /*1*/
//// }
//// declare module 'https' {
//// }
//// /*2*/
goTo.marker("1");
verify.not.completionListContains("http");
goTo.marker("2");
verify.not.completionListContains("http");
verify.not.completionListContains("https");
