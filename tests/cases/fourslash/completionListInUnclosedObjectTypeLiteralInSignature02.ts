/// <reference path="fourslash.ts" />

////interface I<TString, TNumber> {
////    [s: string]: TString;
////    [s: number]: TNumber;
////}
////
////declare function foo<TString, TNumber>(obj: I<TString, TNumber>): { str: TStr/*1*/

verify.completions({
    marker: "1",
    includes: ["I", "TString", "TNumber"], // REVIEW: Is TNumber intended behavior?
    excludes: ["foo", "obj"], // These shouldn't show up since they're not types.
})
