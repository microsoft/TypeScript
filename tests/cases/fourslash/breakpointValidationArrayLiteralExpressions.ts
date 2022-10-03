/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_arrayLiteralExpressions.baseline
// @Filename: bpSpan_arrayLiteralExpressions.ts
////var a = [10, 20, 30];
////function foo(a: number) {
////    return a;
////}
////a = [foo(30), (function () {
////    return 30;
////})()];
////function bar() {
////    return a;
////}
////var x = bar()[0];
////x = (function () {
////    return a;
////})()[x];
////a[(function () {
////    return x;
////})()];

verify.baselineCurrentFileBreakpointLocations();