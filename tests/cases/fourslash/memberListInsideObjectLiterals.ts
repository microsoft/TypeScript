/// <reference path='fourslash.ts'/>

////module ObjectLiterals {
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

// Literal member completion inside empty literal.
goTo.marker("1");
verify.completionListContains("x1", "(property) MyPoint.x1: number");
verify.completionListContains("y1", "(property) MyPoint.y1: number");

// Literal member completion for 2nd member name.
goTo.marker("2");
verify.completionListContains("y1", "(property) MyPoint.y1: number");

// Literal member completion at existing member name location.
goTo.marker("3");
verify.completionListContains("y1", "(property) MyPoint.y1: number");

goTo.marker("4");
verify.completionListContains("x1", "(property) MyPoint.x1: number");