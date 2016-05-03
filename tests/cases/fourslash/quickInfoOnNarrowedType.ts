/// <reference path='fourslash.ts'/>

// @strictNullChecks: true

////function foo(strOrNum: string | number) {
////    if (typeof /*1*/strOrNum === "number") {
////        return /*2*/strOrNum; 
////    }
////    else {
////        return /*3*/strOrNum.length;
////    }
////}

////function bar() {
////   let s: string | undefined;
////   /*4*/s;
////   /*5*/s = "abc";
////   /*6*/s;
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

goTo.marker('4');
verify.quickInfoIs('let s: string | undefined');
verify.completionListContains("s", "let s: string | undefined");

goTo.marker('5');
verify.quickInfoIs('let s: string | undefined');
verify.completionListContains("s", "let s: string | undefined");

goTo.marker('6');
verify.quickInfoIs('let s: string');
verify.completionListContains("s", "let s: string");
