/// <reference path="fourslash.ts" />

//// [|import "./module";
//// f1/*0*/();|]

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;

verify.importFixAtPosition([`import "./module";
import { f1 } from "./module";
f1();`]);
