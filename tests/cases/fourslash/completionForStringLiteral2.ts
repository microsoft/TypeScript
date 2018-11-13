/// <reference path='fourslash.ts'/>

////var o = {
////    foo() { },
////    bar: 0,
////    "some other name": 1
////};
////declare const p: { [s: string]: any, a: number };
////
////o["/*1*/bar"];
////o["/*2*/ ;
////p["/*3*/"];

verify.completions(
    { marker: ["1", "2"], exact: ["foo", "bar", "some other name"] },
    { marker: "3", exact: "a", isNewIdentifierLocation: true },
);
