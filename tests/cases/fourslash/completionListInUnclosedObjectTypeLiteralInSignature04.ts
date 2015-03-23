/// <reference path="fourslash.ts" />

////interface I<TString, TNumber> {
////    [s: string]: TString;
////    [s: number]: TNumber;
////}
////
////declare function foo<TString, TNumber>(obj: I<TString, TNumber>): { /*1*/

goTo.marker("1");

verify.not.memberListContains("I");
verify.not.memberListContains("TString");
verify.not.memberListContains("TNumber");
verify.not.memberListContains("foo");
verify.not.memberListContains("obj");
