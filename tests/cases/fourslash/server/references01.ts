/// <reference path="../fourslash.ts"/>

// Global class reference.

// @Filename: /referencesForGlobals_1.ts
////class /*0*/globalClass {
////    public f() { }
////}

// @Filename: /referencesForGlobals_2.ts
///////<reference path="referencesForGlobals_1.ts" />
////var c = /*1*/globalClass();

verify.baselineFindAllReferences('1')
