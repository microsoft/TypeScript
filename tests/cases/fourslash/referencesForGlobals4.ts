/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
/////*1*/module /*2*/globalModule {
////     export f() { };
////}

// @Filename: referencesForGlobals_2.ts
////var m = /*3*/globalModule;

verify.baselineFindAllReferences('1', '2', '3');
