/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_moduleAmbient.baseline
// @Filename: bpSpan_moduleAmbient.ts
////declare module Bar {
////}
////declare module Foo {
////    var x;
////}

verify.baselineCurrentFileBreakpointLocations();