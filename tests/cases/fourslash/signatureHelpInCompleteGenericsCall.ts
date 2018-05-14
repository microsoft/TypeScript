/// <reference path='fourslash.ts'/>

////function foo<T>(x: number, callback: (x: T) => number) {
////}
////foo(/*1*/

verify.signatureHelp({ marker: "1", text: "foo(x: number, callback: (x: {}) => number): void" });
