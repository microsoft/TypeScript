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
////x./**/

goTo.marker();
verify.memberListContains("commonProperty", "string | number", undefined, undefined, "property");
verify.memberListContains("commonFunction", "() => number", undefined, undefined, "method");
verify.memberListCount(2);