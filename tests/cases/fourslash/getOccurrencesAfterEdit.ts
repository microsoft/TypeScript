/// <reference path='fourslash.ts'/>

/////*0*/
////interface A {
////    foo: string;
////}
////function foo(x: A) {
////    x.f/*1*/oo
////}

verify.baselineDocumentHighlights("1");
goTo.marker("0");
edit.insert("\n");
verify.baselineDocumentHighlights("1");
