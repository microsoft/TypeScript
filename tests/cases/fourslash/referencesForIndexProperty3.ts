/// <reference path='fourslash.ts'/>

// References to a property of the apparent type using string indexer

////interface Object {
////    toMyString();
////}
////
////var y: Object;
////y./*1*/toMyString();
////
////var x = {};
////x[/*2*/"toMyString"]();

goTo.marker("1");
verify.referencesCountIs(3);

goTo.marker("2");
verify.referencesCountIs(3);
