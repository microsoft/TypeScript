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
verify.memberListContains("toString", "(method) toString(): string");
verify.memberListContains("valueOf", "(method) valueOf(): string | number");
verify.memberListCount(2);