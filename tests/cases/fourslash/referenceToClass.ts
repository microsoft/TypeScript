/// <reference path='fourslash.ts'/>

// Class references should work across file and not find local variables.

// @Filename: referenceToClass_1.ts
////class foo/*1*/ {
////    public n: /*2*/foo;
////    public foo: number;
////}
////
////class bar {
////    public n: fo/*3*/o;
////    public k = new foo();
////}
////
////module mod {
////    var k: foo = null;
////}

// @Filename: referenceToClass_2.ts
////var k: /*4*/foo;

goTo.marker("1");
verify.referencesCountIs(6);

goTo.marker("2");

verify.referencesCountIs(6);

goTo.marker("3");

verify.referencesCountIs(6);

goTo.marker("4");

verify.referencesCountIs(6);