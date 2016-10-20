/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: ../package.json
//// { "dependencies": { "fake-module": "latest" } }

// @Filename: ../node_modules/fake-module/nested.ts
//// export var v1 = 5;
//// export function f1();

verify.codeFixAtPosition(
`import { f1 } from "fake-module/nested";
f1();`
);