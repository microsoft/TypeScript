/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: ambientModule.ts
//// declare module "ambient-module" {
////    export function f1();
////    export var v1;
//// }

verify.codeFixAtPosition(
`import { f1 } from "ambient-module";
f1();`
);