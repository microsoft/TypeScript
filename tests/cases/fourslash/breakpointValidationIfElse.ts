/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_ifElse.baseline
// @Filename: bpSpan_ifElse.ts
////var i = 10;
////if (i == 10) {
////    i++;
////} else
////{
////}
////if (i == 10)
////{
////    i++;
////}
////else if (i == 20) {
////    i--;
////} else if (i == 30) {
////    i += 70;
////} else {
////    i--;
////}
////if (function foo() {
////    return 30;
////} ()) {
////    i++;
////}
verify.baselineCurrentFileBreakpointLocations();