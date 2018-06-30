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

verify.completionsAt(["1", "2"], ["foo", "bar", "some other name"]);
verify.completionsAt("3", ["a"], { isNewIdentifierLocation: true });
