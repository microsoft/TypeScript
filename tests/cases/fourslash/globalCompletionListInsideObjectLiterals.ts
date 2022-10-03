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

// 1: Completion on '{' location.
// 2: Literal member completion after member name with empty member expression and missing colon.
// 5, 6: Literal member completion after member name with empty member expression.
const exact = completion.globalsPlus(["p1", "p2", "p3", "p4", "ObjectLiterals"]);
verify.completions(
    { marker: ["1",], exact: exact.filter(name => name !== 'p1'), isNewIdentifierLocation: true },
    { marker: ["2", "3"], exact: exact.filter(name => name !== 'p2') },
    { marker: ["4"], exact: exact.filter(name => name !== 'p3' ) },
    { marker: ["5", "6"], exact: exact.filter(name => name !== 'p4') },
);
