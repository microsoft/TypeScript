/// <reference path='fourslash.ts'/>

//// class C {}
//// /*1*/export { C /*2*/as D };

goTo.marker("1");
verify.noReferences();

goTo.marker("2");
verify.noReferences();