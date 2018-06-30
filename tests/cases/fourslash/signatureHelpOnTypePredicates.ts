/// <reference path="fourslash.ts" />

//// function f1(a: any): a is number {}
//// function f2<T>(a: any): a is T {}
//// function f3(a: any, ...b): a is number {}
//// f1(/*1*/)
//// f2(/*2*/)
//// f3(/*3*/)

verify.signatureHelp(
    { marker: "1", text: "f1(a: any): a is number" },
    { marker: "2", text: "f2<T>(a: any): a is T" },
    { marker: "3", text: "f3(a: any, ...b: any[]): a is number", isVariadic: true },
)
