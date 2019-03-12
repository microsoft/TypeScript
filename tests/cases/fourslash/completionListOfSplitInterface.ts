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

verify.completions(
    { marker: "1", exact: ["i1", "i2", "i3", "a", "b", "c"] },
    { marker: "2", exact: ["i11", "i12", "a", "b", "b1"] },
);
