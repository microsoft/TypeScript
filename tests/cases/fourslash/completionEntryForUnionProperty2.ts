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
verify.memberListContains("toString", "(method) toString(this: String | Number): string");
verify.memberListContains("valueOf", "(method) valueOf(this: String | Number): string | number");
verify.memberListCount(2);
