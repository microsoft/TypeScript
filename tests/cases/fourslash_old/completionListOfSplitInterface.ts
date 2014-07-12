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
verify.memberListCount(6);
verify.memberListContains("a");
verify.memberListContains("b");
verify.memberListContains("c");
verify.memberListContains("i1");
verify.memberListContains("i2");
verify.memberListContains("i3");

goTo.marker('2');
verify.memberListCount(5);
verify.memberListContains("a");
verify.memberListContains("b");
verify.memberListContains("b1");
verify.memberListContains("i11");
verify.memberListContains("i12");
