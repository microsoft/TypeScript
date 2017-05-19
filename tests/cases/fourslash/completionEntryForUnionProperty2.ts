///<reference path="fourslash.ts" />

////interface One {
////    commonProperty: string;
////    commonFunction(): number;
////}
////
////interface Two {
////    commonProperty: number;
////    commonFunction(): number;
////}
////
////var x : One | Two;
////
////x.commonProperty./**/

goTo.marker();
verify.completionListContains("toString", "(method) toString(): string");
verify.completionListContains("valueOf", "(method) valueOf(): string | number");
verify.completionListCount(2);