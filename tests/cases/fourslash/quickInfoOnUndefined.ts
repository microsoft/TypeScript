/// <reference path='fourslash.ts'/>

////function foo(a: string) {
////}
////foo(/*1*/undefined);
////var x = {
////    undefined: 10
////};
////x./*2*/undefined = 30;

goTo.marker('1');
verify.quickInfoIs('(var) undefined');

goTo.marker('2');
verify.quickInfoIs('(property) undefined: number');