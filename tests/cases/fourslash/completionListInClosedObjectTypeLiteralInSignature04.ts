/// <reference path="fourslash.ts" />

////interface I<TString, TNumber> {
////    [s: string]: TString;
////    [s: number]: TNumber;
////}
////
////declare function foo<TString, TNumber>(obj: I<TString, TNumber>): { /*1*/ }

goTo.marker("1");

verify.not.completionListContains("I");
verify.not.completionListContains("TString");
verify.not.completionListContains("TNumber");
verify.not.completionListContains("foo");
verify.not.completionListContains("obj");
