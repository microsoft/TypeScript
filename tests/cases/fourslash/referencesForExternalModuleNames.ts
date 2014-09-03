/// <reference path='fourslash.ts'/>

// Global interface reference.

// @Filename: referencesForGlobals_1.ts
////declare module /*1*/"foo" {
////    var f: number;
////}


// @Filename: referencesForGlobals_2.ts
////import f = require(/*2*/"foo");

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);