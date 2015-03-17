/// <reference path="fourslash.ts" />

////interface I<TString, TNumber> {
////    [s: string]: TString;
////    [s: number]: TNumber;
////}
////
////declare function foo<TString, TNumber>(obj: I<TString, TNumber>): { str: TStr/*1*/

goTo.marker("1");

verify.memberListContains("I");
verify.memberListContains("TString");
verify.not.memberListContains("TNumber");
verify.not.memberListContains("foo");
verify.not.memberListContains("obj");
