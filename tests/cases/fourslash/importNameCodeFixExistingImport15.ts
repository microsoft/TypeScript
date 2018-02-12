/// <reference path="fourslash.ts" />

////import [|{
////    v1, v2,
////    v4
////}|] from "./module";
////v3/*0*/();

// @Filename: module.ts
//// export function v3() {}
//// export var v1 = 5;
//// export var v2 = 5;
//// export var v4 = 5;

verify.importFixAtPosition([
`{
    v1, v2,
    v3,
    v4
}`
]);
