/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
////module /*2*/globalModule {
////     export f() { };
////}

// @Filename: referencesForGlobals_2.ts
////var m = /*1*/globalModule;

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);