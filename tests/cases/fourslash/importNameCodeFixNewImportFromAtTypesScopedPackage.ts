/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: node_modules/@types/myLib__scoped/index.d.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([
`import { f1 } from "@myLib/scoped";

f1();`
]);