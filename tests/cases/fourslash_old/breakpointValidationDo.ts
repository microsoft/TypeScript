/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_do.baseline
// @Filename: bpSpan_do.ts
////var i = 0;
////do
////{
////    i++;
////} while (i < 10);
////do {
////    i++;
////} while (i < 20);

verify.baselineCurrentFileBreakpointLocations();