/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
////module globalModule {
////    export var x;
////}
////
////import /*2*/globalAlias = globalModule;

// @Filename: referencesForGlobals_2.ts
////var m = /*1*/globalAlias;

goTo.marker("1");
verify.referencesCountIs(2);

goTo.marker("2");
verify.referencesCountIs(2);