/// <reference path='fourslash.ts'/>

// Global interface reference.

// @Filename: referencesForGlobals_1.ts
/////*1*/interface /*2*/globalInterface {
////     f();
////}

// @Filename: referencesForGlobals_2.ts
////var i: /*3*/globalInterface;

verify.baselineFindAllReferences('1', '2', '3');
