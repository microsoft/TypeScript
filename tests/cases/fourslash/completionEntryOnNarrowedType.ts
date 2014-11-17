/// <reference path='fourslash.ts'/>

////function foo(strOrNum: string | number) {
////    /*1*/
////    if (typeof strOrNum === "number") {
////        /*2*/ 
////    }
////    else {
////        /*3*/
////    }
////}

goTo.marker('1');
verify.completionListContains("strOrNum", "(parameter) strOrNum: string | number");

goTo.marker('2');
verify.completionListContains("strOrNum", "(parameter) strOrNum: number");

goTo.marker('3');
verify.completionListContains("strOrNum", "(parameter) strOrNum: string");