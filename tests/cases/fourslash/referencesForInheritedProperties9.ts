/// <reference path='fourslash.ts'/>

//// class D extends C {
////     /*0*/prop1: string;
//// }
//// 
//// class C extends D {
////     /*1*/prop1: string;
//// }
//// 
//// var c: C;
//// c./*2*/prop1;

goTo.marker("0");
verify.referencesCountIs(1);

goTo.marker("1");
verify.referencesCountIs(2)

goTo.marker("2");
verify.referencesCountIs(2)