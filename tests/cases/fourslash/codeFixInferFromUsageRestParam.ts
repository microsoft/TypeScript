/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f(a: number, [|...rest |]){
////    a; rest;
////}
////f(1);
////f(2, "s1");
////f(3, "s1", "s2");
////f(3, "s1", "s2", "s3", "s4");

verify.rangeAfterCodeFix("...rest: string[]");