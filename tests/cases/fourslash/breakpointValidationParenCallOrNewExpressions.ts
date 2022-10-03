/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_parenCallOrNewExpressions.baseline
// @Filename: bpSpan_parenCallOrNewExpressions.ts
////function foo(a: number) {
////    return a;
////}
////foo((function bar() {
////    return foo(40);
////})());
////var y = foo((function () {
////    return foo(40);
////})());;
////class greeter {
////    constructor(a: number) {
////    }
////}
////foo(30);
////foo(40 + y);
////y = foo(30);
////y = foo(500 + y);
////new greeter((function bar() {
////    return foo(40);
////})());
////var anotherGreeter = new greeter((function bar() {
////    return foo(40);
////})());
////anotherGreeter = new greeter(30);
////anotherGreeter = new greeter(40 + y);
////new greeter(30);
////new greeter(40 + y);
////function foo2(x: number, y: string) {
////}
////foo2(foo(30), foo(40).toString());
verify.baselineCurrentFileBreakpointLocations();