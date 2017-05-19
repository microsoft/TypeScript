///<reference path="fourslash.ts" />

//// function foo() {}
//// /*0*/
//// var x = function foo() {
////    /*1*/
//// }
//// var y = function () {
////    /*2*/
//// }

goTo.marker("0");
verify.completionListContains("foo", "function foo(): void", /*documentation*/ undefined, "function");
verify.not.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");;

goTo.marker("1");
verify.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");
verify.not.completionListContains("foo", "function foo(): void", /*documentation*/ undefined, "function");;

goTo.marker("2");
verify.completionListContains("foo", "function foo(): void", /*documentation*/ undefined, "function")
verify.not.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");;