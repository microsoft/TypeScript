/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_variables.baseline
// @Filename: bpSpan_variables.ts
////var a = 10;
////var b;
////var c = 10, d, e;
////var c2, d2 = 10;
////module m {
////    var x1;
////    var x2 = 10, x3 = 10;
////    var x4, x5;
////    export var xx1;
////    export var xx2 = 10, xx3 = 10;
////    export var xx4, xx5;
////}

verify.baselineCurrentFileBreakpointLocations();