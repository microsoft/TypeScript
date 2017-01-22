/// <reference path='fourslash.ts' />

////interface I<T> {
////    [/*1*/]: T;
////    [/*2*/]: T;
////}
////
////class C {
////    [/*3*/]: string;
////    [str/*4*/: string]: number;
////}
////
////type T = {
////    [x/*5*/yz: number]: boolean;
////    [/*6*/

goTo.eachMarker(() => verify.completionListAllowsNewIdentifier());
