/// <reference path="fourslash.ts" />

//// [|f1/*0*/();|]

// @Filename: ../package.json
//// { "dependencies": { "fake-module": "latest" } }

// @Filename: ../node_modules/fake-module/index.ts
//// export var v1 = 5;
//// export function f1();

// @Filename: ../node_modules/fake-module/package.json
//// {}

verify.importFixAtPosition([
`import { f1 } from "fake-module";

f1();`
]);
