/// <reference path='fourslash.ts'/>

////class Foo {
////    /*1*/"blah"() { return 0; }
////}
////
////var x: Foo;
////x./*2*/blah;


goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);
