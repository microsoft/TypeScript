/// <reference path="../fourslash.ts"/>

// Global class reference.

// @Filename: referencesForGlobals_1.ts
////class [|globalClass|] {
////    public f() { }
////}

// @Filename: referencesForGlobals_2.ts
///////<reference path="referencesForGlobals_1.ts" />
////var c = [|globalClass|]();

// Must reverse ranges so that referencesForGlobals_2 goes first -- otherwise referencesForGlobals_1 won't pick it up.
verify.rangesReferenceEachOther(test.ranges().reverse());
