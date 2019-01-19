/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    /**/x1: 0,
////};

verify.completions({ marker: "", exact: ["x1", "y1"] });
