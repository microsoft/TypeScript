/// <reference path='fourslash.ts'/>

////class C<T> {
////    constructor(x: T) { }
////    foo(x: T) {
////        return (a: T) => x;
////    }
////}

////var x = new C(1);
////var /*2*/r = x.foo(/*1*/3);
////var /*4*/r2 = r(/*3*/4);

verify.signatureHelp({ marker: "1", text: "foo(x: number): (a: number) => number" });

verify.quickInfoAt("2", "var r: (a: number) => number");

verify.signatureHelp({ marker: "3", text: "r(a: number): number" });

verify.quickInfoAt("4", "var r2: number");
