/// <reference path="fourslash.ts" />

////import * as ns from "./module";
////// Comment
////f1/*0*/();

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([
`import * as ns from "./module";
// Comment
ns.f1();`,
`import * as ns from "./module";
import { f1 } from "./module";
// Comment
f1();`,
]);
