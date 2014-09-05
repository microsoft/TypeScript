/// <reference path='fourslash.ts'/>

////class Foo2 {
////    get /*1*/"42"() { return 0; }
////    set /*2*/42(n) { }
////}
////
////var y: Foo2;
////y[42];

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);