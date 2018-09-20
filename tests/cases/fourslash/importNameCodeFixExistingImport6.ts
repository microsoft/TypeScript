/// <reference path="fourslash.ts" />

//// import [|{ v1 }|] from "fake-module";
//// f1/*0*/();

// @Filename: ../package.json
//// { "dependencies": { "fake-module": "latest" } }

// @Filename: ../node_modules/fake-module/index.ts
//// export var v1 = 5;
//// export function f1();

verify.importFixAtPosition([`{ v1, f1 }`]);
