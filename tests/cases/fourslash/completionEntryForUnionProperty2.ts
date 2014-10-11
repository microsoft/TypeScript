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
verify.memberListContains("toString", "() => string", undefined, undefined, "method");
verify.memberListCount(1);