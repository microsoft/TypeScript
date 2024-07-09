/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_binaryExpressions.baseline
// @Filename: bpSpan_binaryExpressions.ts
////var x = 10;
////var y = 20;
////x += 30;
////x *= 0;
////x = x + 1;
////x = (function foo() {
////    return y;
////})() + y;
////x = y + 30 + (function foo() {
////    return y;
////})() * 40;

verify.baselineCurrentFileBreakpointLocations();