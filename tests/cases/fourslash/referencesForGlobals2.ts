/// <reference path='fourslash.ts'/>

// Global class reference.

// @Filename: referencesForGlobals_1.ts
////class [|{| "isWriteAccess": true, "isDefinition": true |}globalClass|] {
////    public f() { }
////}

// @Filename: referencesForGlobals_2.ts
////var c = [|globalClass|]();

verify.singleReferenceGroup("class globalClass");
