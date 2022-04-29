/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_conditionalExpressions.baseline
// @Filename: bpSpan_conditionalExpressions.ts
////var x = 10;
////var y = x ? x + 10 : 30;
////var z = (function foo() {
////    return x;
////})() ? y : function bar() {
////        return x;
////} ();
////x = y ? (function () {
////    return z;
////})() :  10;

verify.baselineCurrentFileBreakpointLocations();