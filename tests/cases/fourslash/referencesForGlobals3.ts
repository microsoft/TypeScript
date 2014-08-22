/// <reference path='fourslash.ts'/>

// Global interface reference.

// @Filename: referencesForGlobals_1.ts
////interface /*2*/globalInterface {
////     f();
////}

// @Filename: referencesForGlobals_2.ts
////var i: /*1*/globalInterface;

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);