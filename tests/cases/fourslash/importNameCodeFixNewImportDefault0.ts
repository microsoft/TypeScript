/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: module.ts
//// export default function f1() { };

verify.codeFixAtPosition(
`import f1 from "./module";
f1();`
);