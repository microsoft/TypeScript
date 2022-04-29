/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_const.baseline
// @Filename: bpSpan_const.ts
////const c1 = false;
////const c2: number = 23;
////const c3 = 0, c4 :string = "", c5 = null;
////for(const c4 = 0; c4 < 9; ) { break; }
////for(const c5 = 0, c6 = 0; c5 < c6; ) { break; }
////module M {
////    export const cc1 = false;
////    export const cc2: number = 23;
////    export const cc3 = 0, cc4 :string = "", cc5 = null;
////}
////const enum E {
////    A = 1,
////    B = 2,
////    C = A | B
////}
////const enum E2 {
////    A = 1,
////    B,
////    C
////}
verify.baselineCurrentFileBreakpointLocations();