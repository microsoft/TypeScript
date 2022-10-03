/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_typealias.baseline
// @Filename: bpSpan_typealias.ts
////module m2 {
////    module m {
////        export class c {
////        }
////    }
////    type a = m.c;
////    export type b = m.c;
////    var x: a = new m.c();
////    var y: b = new m.c();
////}
verify.baselineCurrentFileBreakpointLocations();