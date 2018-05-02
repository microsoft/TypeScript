/// <reference path="fourslash.ts"/>

//// declare module "http" {
////    var x;
////    /*1*/
//// }
//// declare module 'https' {
//// }
//// /*2*/

verify.completions(
    { at: "1", excludes: "http" },
    { at: "2", excludes: ["http", "https"] },
);
