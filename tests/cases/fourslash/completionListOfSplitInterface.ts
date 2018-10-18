/// <reference path="fourslash.ts"/>

////interface A {
////    a: number;
////}
////interface I extends A {
////    i1: number;
////}
////interface I1 extends A {
////    i11: number;
////}
////interface B {
////    b: number;
////}
////interface B1 {
////    b1: number;
////}
////interface I extends B {
////    i2: number;
////}
////interface I1 extends B, B1 {
////    i12: number;
////}
////interface C {
////    c: number;
////}
////interface I extends C {
////    i3: number;
////}
////var ci: I;
////ci./*1*/b;
////var ci1: I1;
////ci1./*2*/b;

goTo.marker('1');
verify.completionListCount(6);
verify.completionListContains("a");
verify.completionListContains("b");
verify.completionListContains("c");
verify.completionListContains("i1");
verify.completionListContains("i2");
verify.completionListContains("i3");

goTo.marker('2');
verify.completionListCount(5);
verify.completionListContains("a");
verify.completionListContains("b");
verify.completionListContains("b1");
verify.completionListContains("i11");
verify.completionListContains("i12");
