/// <reference path='fourslash.ts'/>

// Global class reference.

// @Filename: referencesForGlobals_1.ts
////class /*2*/globalClass {
////    public f() { }
////}

// @Filename: referencesForGlobals_2.ts
////var c = /*1*/globalClass();

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);