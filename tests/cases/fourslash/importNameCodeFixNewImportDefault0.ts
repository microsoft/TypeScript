/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: module.ts
//// export default function f1() { };

verify.importFixAtPosition([
`import f1 from "./module";

f1();`
]);
