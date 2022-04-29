/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: jalapeño.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([
`import { f1 } from "./jalapeño";

f1();`
]);
