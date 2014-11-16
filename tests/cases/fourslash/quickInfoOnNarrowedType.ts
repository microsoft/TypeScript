/// <reference path='fourslash.ts'/>

////function foo(strOrNum: string | number) {
////    if (typeof /*1*/strOrNum === "number") {
////        return /*2*/strOrNum; 
////    }
////    else {
////        return /*3*/strOrNum.length;
////    }
////}

goTo.marker('1');
verify.quickInfoIs('(parameter) strOrNum: string | number');
verify.completionListContains("strOrNum", "(parameter) strOrNum: string | number");

goTo.marker('2');
verify.quickInfoIs('(parameter) strOrNum: number');
verify.completionListContains("strOrNum", "(parameter) strOrNum: number");

goTo.marker('3');
verify.quickInfoIs('(parameter) strOrNum: string');
verify.completionListContains("strOrNum", "(parameter) strOrNum: string");
