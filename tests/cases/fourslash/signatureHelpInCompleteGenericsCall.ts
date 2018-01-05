/// <reference path='fourslash.ts'/>

////function foo<T>(x: number, callback: (x: T) => number) {
////}
////foo(/*1*/

goTo.marker('1');
verify.currentSignatureHelpIs("foo(x: number, callback: (x: {}) => number): void");