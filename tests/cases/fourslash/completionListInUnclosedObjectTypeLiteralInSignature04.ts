/// <reference path="fourslash.ts" />

////interface I<TString, TNumber> {
////    [s: string]: TString;
////    [s: number]: TNumber;
////}
////
////declare function foo<TString, TNumber>(obj: I<TString, TNumber>): { /*1*/

verify.completionsAt("1", ["readonly"], { isNewIdentifierLocation: true });
