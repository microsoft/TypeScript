/// <reference path="fourslash.ts" />

////interface MyPoint {
////    x1: number;
////    y1: number;
////}
////var p15: MyPoint = {
////    "x1": 5,
////    /*15*/
////};

verify.completions({ marker: "15", exact: "y1" });
