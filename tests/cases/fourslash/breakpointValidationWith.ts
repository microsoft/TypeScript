/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_with.baseline
// @Filename: bpSpan_with.ts
////var obj: string;
////with (obj) {
////    x = 10;
////}

verify.baselineCurrentFileBreakpointLocations();