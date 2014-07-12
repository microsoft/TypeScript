/// <reference path='fourslash.ts'/>

////function f<T>(x: T): T { return null; }
////var r/*1*/ = <T>(x: T) => x;
////var r2/*2*/ = < <T>(x: T) => T>f;

////var a;
////var r3/*3*/ = < <T>(x: <A>(y: A) => A) => T>a;

goTo.marker('1');
verify.quickInfoIs('<T>(x: T) => T');

goTo.marker('2');
verify.quickInfoIs('<T>(x: T) => T');

goTo.marker('3');
verify.quickInfoIs('<T>(x: <A>(y: A) => A) => T');