/// <reference path='fourslash.ts'/>

/////*0*/
////interface A {
////    foo: string;
////}
////function foo(x: A) {
////    x.f/*1*/oo
////}

goTo.marker("1");
verify.occurrencesAtPositionCount(2);

goTo.marker("0");
edit.insert("\r\n");

goTo.marker("1");
verify.occurrencesAtPositionCount(2);