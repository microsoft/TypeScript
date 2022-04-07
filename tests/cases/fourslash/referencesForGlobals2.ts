/// <reference path='fourslash.ts'/>

// Global class reference.

// @Filename: referencesForGlobals_1.ts
/////*1*/class /*2*/globalClass {
////    public f() { }
////}

// @Filename: referencesForGlobals_2.ts
////var c = /*3*/globalClass();

verify.baselineFindAllReferences('1', '2', '3');
