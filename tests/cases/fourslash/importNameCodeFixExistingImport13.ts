/// <reference path="fourslash.ts" />

//// import [|{v1, v3, v4,}|] from "./module";
//// v2/*0*/();

// @Filename: module.ts
//// export var v1 = 5;
//// export function v2() {}
//// export var v3 = 5;
//// export var v4 = 5;

verify.importFixAtPosition([`{v1, v2, v3, v4,}`]);
