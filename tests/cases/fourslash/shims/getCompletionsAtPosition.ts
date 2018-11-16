/// <reference path='fourslash.ts'/>

////function foo(strOrNum: string | number) {
////    /*1*/
////    if (typeof strOrNum === "number") {
////        strOrNum/*2*/;
////    }
////    else {
////        strOrNum/*3*/;
////    }
////}

verify.completions(
    { marker: "1", includes: { name: "strOrNum", text: "(parameter) strOrNum: string | number" } },
    { marker: "2", includes: { name: "strOrNum", text: "(parameter) strOrNum: number" } },
    { marker: "3", includes: { name: "strOrNum", text: "(parameter) strOrNum: string" } },
);
