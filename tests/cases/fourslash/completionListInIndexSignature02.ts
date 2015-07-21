/// <reference path='fourslash.ts' />

////interface I<T> {
////    [x: /*1*/]: T;
////    [: /*2*/]: T
////}
////
////class C {
////    [a: /*3*/]: string;
////    [str: string/*4*/]: number;
////}
////
////type T = {
////    [xyz: /*5*/

for (let marker of test.markers()) {
    goTo.position(marker.position);
    verify.not.completionListAllowsNewIdentifier();
}