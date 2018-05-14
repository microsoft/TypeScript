/// <reference path='fourslash.ts'/>

////function foo<T, U>(x: T, y: U): (a: U) => T {
////    var z = y;
////    return (z) => x;
////}

////var /*2*/r = foo(/*1*/1, "");
////var /*4*/r2 = r(/*3*/"");

// TODO: GH##23631
// verify.signatureHelp({ marker: "1", text: "foo(x: number, y: string): (a: string) => number" });

verify.quickInfoAt("2", "var r: (a: string) => number");

verify.signatureHelp({ marker: "3", text: "r(a: string): number" });

verify.quickInfoAt("4", "var r2: number");
