/// <reference path="fourslash.ts" />

////import [|{
////    v1, v2,
////    v3
////}|] from "./module";
////f1/*0*/();

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;
//// export var v2 = 5;
//// export var v3 = 5;

verify.importFixAtPosition([
`{
    v1, v2,
    v3,
    f1
}`
]);
