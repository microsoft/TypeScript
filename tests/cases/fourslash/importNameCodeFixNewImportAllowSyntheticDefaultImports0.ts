/// <reference path="fourslash.ts" />
// @AllowSyntheticDefaultImports: true

// @Filename: a/f1.ts
//// [|export var x = 0;
//// bar/*0*/();|]

// @Filename: a/foo.d.ts
//// declare function bar(): number;
//// export = bar;
//// export as namespace bar;

verify.importFixAtPosition([
`import bar from "./foo";

export var x = 0;
bar();`
  ]);