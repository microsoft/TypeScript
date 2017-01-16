/// <reference path='fourslash.ts'/>

// Global interface reference.

// @Filename: referencesForGlobals_1.ts
////declare module "[|foo|]" {
////    var f: number;
////}


// @Filename: referencesForGlobals_2.ts
////import f = require("[|foo|]");

verify.rangesReferenceEachOther();
