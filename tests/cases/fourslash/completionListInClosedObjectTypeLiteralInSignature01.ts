/// <reference path="fourslash.ts" />

////interface I<TString, TNumber> {
////    [s: string]: TString;
////    [s: number]: TNumber;
////}
////
////declare function foo<TString, TNumber>(obj: I<TString, TNumber>): { str: T/*1*/ }

verify.completions({
    marker: "1",
    includes: ["I", "TString", "TNumber"],
    excludes: ["foo", "obj"], // not types
});
