/// <reference path="fourslash.ts" />

//// [|import d, * as ns from "./module"   ;
//// f1/*0*/();|]

// @Filename: module.ts
//// export function f1() {}
//// export var v1 = 5;
//// export default var d1 = 6;

// Test with some extra spaces before the semicolon
verify.importFixAtPosition([
`import d, * as ns from "./module"   ;
ns.f1();`,
`import d, * as ns from "./module"   ;
import { f1 } from "./module";
f1();`
]);
