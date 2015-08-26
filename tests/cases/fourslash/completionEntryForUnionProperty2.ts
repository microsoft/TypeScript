///<reference path="fourslash.ts" />

////interface One {
////    commonProperty: number;
////    commonFunction(): number;
////}
////
////interface Two {
////    commonProperty: string
////    commonFunction(): number;
////}
////
////var x : One | Two;
////
////x.commonProperty./**/

goTo.marker();
verify.memberListContains("toString", "(method) toString(): string");
verify.memberListContains("valueOf", "(method) valueOf(): number | string");
verify.memberListCount(2);