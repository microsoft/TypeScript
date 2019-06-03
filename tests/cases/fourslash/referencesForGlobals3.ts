/// <reference path='fourslash.ts'/>

// Global interface reference.

// @Filename: referencesForGlobals_1.ts
////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}globalInterface|] {
////     f();
////}|]

// @Filename: referencesForGlobals_2.ts
////var i: [|globalInterface|];

verify.singleReferenceGroup("interface globalInterface", test.rangesByText().get("globalInterface"));
