/// <reference path="fourslash.ts" />

////// polyfill
////import c from "C";
/////*
////* demo
////*/
////import d from "D";
////import a from "A";
////import b from "B";
////
////console.log(a, b, c, d)

verify.organizeImports(
`// polyfill
import c from "C";
/*
* demo
*/
import a from "A";
import b from "B";
import d from "D";

console.log(a, b, c, d)`
);
