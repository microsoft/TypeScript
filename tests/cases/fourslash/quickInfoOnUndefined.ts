/// <reference path='fourslash.ts'/>

////function foo(a: string) {
////}
////foo(/*1*/undefined);

goTo.marker('1');
verify.quickInfoIs('(var) undefined');