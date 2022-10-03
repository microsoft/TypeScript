/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_import.baseline
// @Filename: bpSpan_import.ts
////module m {
////    class c {
////    }
////}
////import a = m.c;
////export import b = m.c;
////var x = new a();
////var y = new b();
verify.baselineCurrentFileBreakpointLocations();