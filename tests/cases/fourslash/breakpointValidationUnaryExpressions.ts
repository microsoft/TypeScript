/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_unaryExpressions.baseline
// @Filename: bpSpan_unaryExpressions.ts
////var x = 10;
////var y = 20;
////x++;
////y--;
////typeof (function foo() {
////    return y;
////})();
////++x;
////++y;

verify.baselineCurrentFileBreakpointLocations();