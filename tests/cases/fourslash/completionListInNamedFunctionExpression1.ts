///<reference path="fourslash.ts" />

//// var x = function foo() {
////    /*1*/
//// }

goTo.marker("1");
verify.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");