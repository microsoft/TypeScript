/// <reference path='fourslash.ts' />

// @BaselineFile: getBreakpointStatementAtPosition.baseline
// @Filename: getBreakpointStatementAtPosition.ts
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