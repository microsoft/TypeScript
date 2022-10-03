/// <reference path='fourslash.ts' />

////// outer
////var ___proto__ = 10;
////function foo() {
////    var __proto__ = "hello";
////    /**/
////}

verify.completions({
    marker: "",
    includes: [
        { name: "__proto__", text: "(local var) __proto__: string" },
        { name: "___proto__", text: "var ___proto__: number" },
    ],
});
