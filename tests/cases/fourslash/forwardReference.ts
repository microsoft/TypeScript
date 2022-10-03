/// <reference path='fourslash.ts' />

////function f() {
////    var x = new t();
////    x./**/
////}
////class t {
////    public n: number;
////}

verify.completions({ marker: "", exact: "n" });
