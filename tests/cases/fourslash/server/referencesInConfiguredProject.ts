/// <reference path="../fourslash.ts"/>

// Global class reference.

// @Filename: referencesForGlobals_1.ts
////class [|globalClass|] {
////    public f() { }
////}

// @Filename: referencesForGlobals_2.ts
////var c = [|globalClass|]();

// @Filename: tsconfig.json
////{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }

verify.rangesReferenceEachOther();
