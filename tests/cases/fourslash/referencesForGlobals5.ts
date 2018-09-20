/// <reference path='fourslash.ts'/>

// Global module reference.

// @Filename: referencesForGlobals_1.ts
////module globalModule {
////    export var x;
////}
////
////import [|{| "isWriteAccess": true, "isDefinition": true |}globalAlias|] = globalModule;

// @Filename: referencesForGlobals_2.ts
////var m = [|globalAlias|];

verify.singleReferenceGroup("(alias) namespace globalAlias\nimport globalAlias = globalModule");
