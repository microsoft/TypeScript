/// <reference path="fourslash.ts" />

//// [|import { v2 } from './module2';
////
//// f1/*0*/();|]

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;

// @Filename: module2.ts
//// export var v2 = 6;

verify.importFixAtPosition([
`import { v2 } from './module2';
import { f1 } from './module';

f1();`
]);
