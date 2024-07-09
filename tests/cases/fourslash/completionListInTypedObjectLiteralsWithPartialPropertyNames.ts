/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    /**/
////};

verify.completions({ marker: "", exact: ["x1", "y1"] });

//      x|
edit.insert("x");
verify.completions({ exact: ["x1", "y1"] });

//      x1|
edit.insert("1");
verify.completions({ exact: ["x1", "y1"] })

//      x1: null,|
edit.insert(": null,");
verify.completions({ exact: ["y1"] });
