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
verify.memberListContains("commonProperty", "(property) commonProperty: number | string");
verify.memberListContains("commonFunction", "(method) commonFunction(): number");
verify.memberListCount(2);