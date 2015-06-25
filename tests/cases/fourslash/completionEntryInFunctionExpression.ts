///<reference path="fourslash.ts" />

//// var x = function foo() {
////    /*1*/
////    f/*2*/
////    fo/*3*/
////    foo/*4*/
//// }

goTo.marker("1");
verify.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");

goTo.marker("2");
verify.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");

goTo.marker("3");
verify.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");

goTo.marker("4");
verify.completionListContains("foo", "(local function) foo(): void", /*documentation*/ undefined, "local function");