/// <reference path='fourslash.ts'/>

////class C<T> {
////    constructor(x: T) { }
////    foo(x: T) {
////        return (a: T) => x;
////    }
////}

////var x = new C(1);
////var r/*2*/ = x.foo(/*1*/3);
////var r2/*4*/ = r(/*3*/4);

goTo.marker('1');
verify.currentSignatureHelpIs('foo(x: number): (a: number) => number');

goTo.marker('2');
verify.quickInfoIs('(a: number) => number');

goTo.marker('3');
verify.currentSignatureHelpIs('r(a: number): number');

goTo.marker('4');
verify.quickInfoIs('number');