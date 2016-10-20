/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: ../../other_dir/module.ts
//// export var v1 = 5;
//// export function f1();

verify.codeFixAtPosition(
`import { f1 } from "../../other_dir/module";
f1();`
);