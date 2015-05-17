/// <reference path='fourslash.ts' />

//// /*1*/interface A {}
////
//// /*2*/export /*3*/interface B {}

goTo.marker("1");
verify.quickInfoIs("interface A");

goTo.marker("2");
verify.quickInfoIs("interface B");

goTo.marker("3");
verify.quickInfoIs("interface B");