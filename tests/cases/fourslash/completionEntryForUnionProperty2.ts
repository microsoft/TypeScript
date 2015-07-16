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
verify.memberListContains("toString", "(property) toString: (() => string) | ((radix?: number) => string)");
verify.memberListContains("valueOf", "(method) valueOf(): string | number");
verify.memberListCount(2);