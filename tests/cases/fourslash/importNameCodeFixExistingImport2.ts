/// <reference path="fourslash.ts" />

//// import * as ns from "./module";
//// [|f1|]/*0*/();

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;

verify.codeFixAtPosition(`ns.f1`);