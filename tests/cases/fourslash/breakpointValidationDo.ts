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
////do {
////    i++;
////} 
////while (i < 30);
////do {
////    i--;
////} while ((function () {
////        return 30 * i;
////    })() !== i); 
verify.baselineCurrentFileBreakpointLocations();