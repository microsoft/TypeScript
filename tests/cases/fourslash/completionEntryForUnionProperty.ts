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
verify.completionListContains("commonProperty", "(property) commonProperty: string | number");
verify.completionListContains("commonFunction", "(method) commonFunction(): number");
verify.completionListCount(2);