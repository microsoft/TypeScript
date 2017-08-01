/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: node_modules/@types/myLib/index.d.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([
`import { f1 } from "myLib";

f1();`
]);