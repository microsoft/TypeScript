/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
////module [|globalModule|] {
////     export f() { };
////}

// @Filename: referencesForGlobals_2.ts
////var m = [|globalModule|];

verify.rangesReferenceEachOther();
