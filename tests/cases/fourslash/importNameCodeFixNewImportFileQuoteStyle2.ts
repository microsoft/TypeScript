/// <reference path="fourslash.ts" />

//// [|import m2 = require('./module2');
////
//// f1/*0*/();|]

// @Filename: module1.ts
//// export function f1() {}

// @Filename: module2.ts
//// export var v2 = 6;

verify.importFixAtPosition([
`import { f1 } from './module1';
import m2 = require('./module2');

f1();`
]);
