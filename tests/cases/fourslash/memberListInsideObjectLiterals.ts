/// <reference path='fourslash.ts'/>

////namespace ObjectLiterals {
////    interface MyPoint {
////        x1: number;
////        y1: number;
////    }
////
////    var p1: MyPoint = {
////        /*1*/
////    };
////
////    var p2: MyPoint = {
////        x1: 5,
////        /*2*/
////    };
////
////    var p3: MyPoint = {
////        x1/*3*/:
////    };
////
////    var p4: MyPoint = {
////        /*4*/y1
////    };
////}

const x1 = { name: "x1", text: "(property) MyPoint.x1: number" };
const y1 = { name: "y1", text: "(property) MyPoint.y1: number" };
verify.completions(
    { marker: ["1", "3", "4"], exact: [x1, y1] }, // Literal member completion inside empty literal or at existing member name location
    { marker: ["2"], exact: y1 }, // Literal member completion for 2nd member name
);
