/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////interface A {
////    foo: string;
////}

// @Filename: b.ts
///////<reference path='a.ts'/>
/////*0*/
////function foo(x: A) {
////    x.f/*1*/oo
////}

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("0");
edit.insert("\r\n");

goTo.marker("1");
verify.referencesCountIs(2);