/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_interface.baseline
// @Filename: bpSpan_interface.ts
////interface I {
////    property: string;
////    method(): number;
////    (a: string): string;
////    new (a: string): I;
////    [a: number]: number;
////}
////module m {
////    interface I1 {
////        property: string;
////        method(): number;
////        (a: string): string;
////        new (a: string): I;
////        [a: number]: number;
////    }
////    export interface I2 {
////        property: string;
////        method(): number;
////        (a: string): string;
////        new (a: string): I;
////        [a: number]: number;
////    }
////}

verify.baselineCurrentFileBreakpointLocations();