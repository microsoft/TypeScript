/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_inComments.baseline
// @Filename: bpSpan_inComments.ts
/////*comment here*/ var x = 10; /*comment here*/
////// comment only line
/////*multiline comment
////another line of multiline comment */ var y = 10; // comment here

verify.baselineCurrentFileBreakpointLocations();