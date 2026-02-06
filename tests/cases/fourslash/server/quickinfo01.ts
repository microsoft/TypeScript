/// <reference path="../fourslash.ts"/>

// @lib: es5

////interface One {
////    commonProperty: number;
////    commonFunction(): number;
////}
////
////interface Two {
////    commonProperty: string
////    commonFunction(): number;
////}
////
////var /*1*/x : One | Two;
////
////x./*2*/commonProperty;
////x./*3*/commonFunction;

verify.quickInfos({
    1: "var x: One | Two",
    2: "(property) commonProperty: string | number",
    3: "(method) commonFunction(): number"
});
