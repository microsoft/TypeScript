/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_while.baseline
// @Filename: bpSpan_while.ts
////var a = 10;
////while (a == 10) {
////    a++;
////}
////while (a == 10) 
////{
////    a++;
////}
////while (a == 10)  a++;
////while (a == 10) 
////    a++;
////while ((function () {
////    return 30 * a;
////})() !== a) {
////    a--;
////}

verify.baselineCurrentFileBreakpointLocations();