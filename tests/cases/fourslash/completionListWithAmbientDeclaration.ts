/// <reference path="fourslash.ts"/>

//// declare module "http" {
////    var x;
////    /*1*/
//// }
//// declare module 'https' {
//// }
//// /*2*/

verify.completions(
    { marker: "1", excludes: "http" },
    { marker: "2", excludes: ["http", "https"] },
);
