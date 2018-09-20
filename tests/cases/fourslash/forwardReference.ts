/// <reference path='fourslash.ts' />

////function f() {
////    var x = new t();
////    x./**/
////}
////class t {
////    public n: number;
////}

goTo.marker();
verify.completionListContains('n');
