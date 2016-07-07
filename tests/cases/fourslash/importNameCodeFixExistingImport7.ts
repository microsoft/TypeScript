/// <reference path="fourslash.ts" />

//// import { v1 } from "../../other_dir/module.ts";
//// f1/*0*/();

// @Filename: ../../other_dir/module.ts
//// export var v1 = 5;
//// export function f1();

verify.codeFixAtPosition(
`import { v1, f1 } from "../../other_dir/module.ts";
f1();`
);