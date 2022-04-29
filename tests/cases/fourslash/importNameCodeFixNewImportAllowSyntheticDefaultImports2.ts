/// <reference path="fourslash.ts" />
// @AllowSyntheticDefaultImports: false
// @Module: system

// @Filename: a/f1.ts
//// [|export var x = 0;
//// bar/*0*/();|]

// @Filename: a/foo.d.ts
//// declare function bar(): number;
//// export = bar;
//// export as namespace bar;

verify.importFixAtPosition([
`import * as bar from "./foo";

export var x = 0;
bar();`
]);