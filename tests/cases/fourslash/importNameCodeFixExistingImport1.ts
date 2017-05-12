/// <reference path="fourslash.ts" />

//// import d, [|{ v1 }|] from "./module";
//// f1/*0*/();

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;
//// export default var d1 = 6;

verify.importFixAtPosition([`{ v1, f1 }`]);
