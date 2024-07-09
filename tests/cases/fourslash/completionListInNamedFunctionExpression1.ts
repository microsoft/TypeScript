///<reference path="fourslash.ts" />

//// var x = function foo() {
////    /*1*/
//// }

verify.completions({ marker: "1", includes: { name: "foo", text: "(local function) foo(): void", kind: "local function" } });
