/// <reference path='fourslash.ts' />

// @noImplicitAny: true
////function f(a: number, [|...rest |]){
////    console.log(JSON.stringify(rest));
////}

verify.rangeAfterCodeFix("...rest: any[]");