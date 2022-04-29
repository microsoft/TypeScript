/// <reference path='fourslash.ts' />

// @BaselineFile: bpSpan_let.baseline
// @Filename: bpSpan_let.ts
////let l1;
////let l2: number;
////let l3, l4, l5 :string, l6;
////let l7 = false;
////let l8: number = 23;
////let l9 = 0, l10 :string = "", l11 = null;
////for(let l11 in {}) { }
////for(let l12 = 0; l12 < 9; l12++) { }
////module M {
////    let ll1 = "s";
////    export let ll2 = 0;
////}
verify.baselineCurrentFileBreakpointLocations();