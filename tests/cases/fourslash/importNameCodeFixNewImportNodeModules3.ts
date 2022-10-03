/// <reference path="fourslash.ts" />

// @Filename: /a.ts
//// [|f1/*0*/();|]

// @Filename: /node_modules/@types/random/index.d.ts
//// export var v1 = 5;
//// export function f1();

verify.importFixAtPosition([
`import { f1 } from "random";

f1();`
]);
