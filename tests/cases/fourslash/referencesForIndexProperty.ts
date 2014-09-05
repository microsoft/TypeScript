/// <reference path='fourslash.ts'/>

// References a class property using string index access

////class Foo {
////    property: number;
////    method(): void { }
////}
////
////var f: Foo;
////f[/*1*/"property"];
////f[/*2*/"method"];

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);
