/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
////module globalModule {
////    export var x;
////}
////
////import [|globalAlias|] = globalModule;

// @Filename: referencesForGlobals_2.ts
////var m = [|globalAlias|];

verify.rangesReferenceEachOther();
