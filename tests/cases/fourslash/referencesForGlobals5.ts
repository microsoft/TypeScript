/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
////module globalModule {
////    export var x;
////}
////
/////*1*/import /*2*/globalAlias = globalModule;

// @Filename: referencesForGlobals_2.ts
////var m = /*3*/globalAlias;

verify.baselineFindAllReferences('1', '2', '3');
