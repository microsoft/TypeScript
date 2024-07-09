///<reference path="fourslash.ts" />

//// function foo() {}
//// /*0*/
//// var x = function foo() {
////    /*1*/
//// }
//// var y = function () {
////    /*2*/
//// }

verify.completions(
    { marker: ["0", "2"], includes: { name: "foo", text: "function foo(): void", kind: "function" } },
    { marker: "1", includes: { name: "foo", text: "(local function) foo(): void", kind: "local function" } },
);
