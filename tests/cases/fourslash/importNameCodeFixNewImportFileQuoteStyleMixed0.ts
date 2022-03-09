/// <reference path="fourslash.ts" />

//// [|import { v2 } from "./module2";
//// import { v3 } from './module3';
////
//// f1/*0*/();|]

// @Filename: module1.ts
//// export function f1() {}

// @Filename: module2.ts
//// export var v2 = 6;

// @Filename: module3.ts
//// export var v3 = 6;

verify.importFixAtPosition([
`import { f1 } from "./module1";
import { v2 } from "./module2";
import { v3 } from './module3';

f1();`
]);
