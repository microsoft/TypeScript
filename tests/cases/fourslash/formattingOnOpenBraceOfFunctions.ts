/// <reference path='fourslash.ts' />

/////**/function T2_y()
////{
////Plugin.T1.t1_x();
////}

format.document();
goTo.marker();
verify.currentLineContentIs("function T2_y() {");