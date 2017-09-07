/// <reference path='fourslash.ts'/>

////module ObjectLiterals {
////    interface MyPoint {
////        x1: number;
////        y1: number;
////    }
////
////    // Negative cases (global completion)
////    var p1: MyPoint = /*1*/{
////    };
////
////    var p2: MyPoint = {
////        x1: /*2*/
////    /*3*/};
////
////    var p3: MyPoint = {
////        y1 /*4*/
////    };
////
////    var p4: MyPoint = {
////        x1: /*5*/ /*6*/,
////    };
////}

function VerifyGlobalCompletionList() {
    verify.completionListItemsCountIsGreaterThan(10);
}

// Completion on '{' location.
goTo.marker("1");
VerifyGlobalCompletionList();

// Literal member completion after member name with empty member expression and missing colon.
goTo.marker("2");
VerifyGlobalCompletionList();

goTo.marker("3");
VerifyGlobalCompletionList();

goTo.marker("4");
verify.completionListIsEmpty();

// Literal member completion after member name with empty member expression.
goTo.marker("5");
VerifyGlobalCompletionList();

goTo.marker("6");
VerifyGlobalCompletionList();