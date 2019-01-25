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

verify.quickInfos({
    1: "(parameter) strOrNum: string | number",
    2: "(parameter) strOrNum: number",
    3: "(parameter) strOrNum: string",
    4: "let s: string | undefined",
    5: "let s: string | undefined",
    6: "let s: string",
});

verify.completions(
    { marker: "1", includes: { name: "strOrNum", text: "(parameter) strOrNum: string | number" } },
    { marker: "2", includes: { name: "strOrNum", text: "(parameter) strOrNum: number" } },
    { marker: "3", includes: { name: "strOrNum", text: "(parameter) strOrNum: string" } },
    { marker: ["4", "5"], includes: { name: "s", text: "let s: string | undefined" } },
    { marker: "6", includes: { name: "s", text: "let s: string" } },
);
