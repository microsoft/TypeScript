/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_moduleAmbient.baseline
// @Filename: bpSpan_moduleAmbient.ts
////declare namespace Bar {
////}
////declare namespace Foo {
////    var x;
////}

verify.baselineCurrentFileBreakpointLocations();