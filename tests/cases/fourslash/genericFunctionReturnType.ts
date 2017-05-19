/// <reference path='fourslash.ts'/>

////function foo<T, U>(x: T, y: U): (a: U) => T {
////    var z = y;
////    return (z) => x;
////}

////var /*2*/r = foo(/*1*/1, "");
////var /*4*/r2 = r(/*3*/"");

// goTo.marker('1');
// verify.currentSignatureHelpIs('foo(x: number, y: string): (a: string) => number');

verify.quickInfoAt("2", "var r: (a: string) => number");

goTo.marker('3');
verify.currentSignatureHelpIs('r(a: string): number');

verify.quickInfoAt("4", "var r2: number");
