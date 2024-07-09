/// <reference path="fourslash.ts" />
// @AllowSyntheticDefaultImports: false
// @Module: amd

// @Filename: a/f1.ts
//// [|export var x = 0;
//// bar/*0*/();|]

// @Filename: a/foo.d.ts
//// declare function bar(): number;
//// export = bar;
//// export as namespace bar;

verify.importFixAtPosition([
`import bar = require("./foo");

export var x = 0;
bar();`
]);