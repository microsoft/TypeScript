/// <reference path="fourslash.ts" />

//// [|import d from "./module";
//// f1/*0*/();|]

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;
//// export default var d1 = 6;

verify.importFixAtPosition([
`import d, { f1 } from "./module";
f1();`
]);
