/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_breakOrContinue.baseline
// @Filename: bpSpan_breakOrContinue.ts
////while (true) {
////    break;
////}
////y: while (true) {
////    break y;
////}
////while (true) {
////    continue;
////}
////z: while (true) {
////    continue z;
////}
verify.baselineCurrentFileBreakpointLocations();