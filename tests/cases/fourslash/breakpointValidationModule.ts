/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_module.baseline
// @Filename: bpSpan_module.ts
////module m2 {
////    var a = 10;
////    a++;
////}
////module m3 {
////    module m4 {
////        export var x = 30;
////    }
////
////    export function foo() {
////        return m4.x;
////    }
////}
////module m4 {
////    interface I { }
////}
////module m12
////{
////    var a = 10;
////    a++;
////}
////module m13
////{
////    module m14 
////    {
////        export var x = 30;
////    }
////
////    export function foo() {
////        return m4.x;
////    }
////}
////module m14 
////{
////    interface I { }
////}

verify.baselineCurrentFileBreakpointLocations();