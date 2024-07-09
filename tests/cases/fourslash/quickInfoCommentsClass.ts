/// <reference path='fourslash.ts' />

/////** This is class c2 without constructor*/
////class c/*1*/2 {
////}
////var i/*2*/2 = new c/*28*/2();
////var i2/*4*/_c = c/*5*/2;
////class c/*6*/3 {
////    /** Constructor comment*/
////    constructor() {
////    }
////}
////var i/*7*/3 = new c/*29*/3();
////var i3/*9*/_c = c/*10*/3;
/////** Class comment*/
////class c/*11*/4 {
////    /** Constructor comment*/
////    constructor() {
////    }
////}
////var i/*12*/4 = new c/*30*/4();
////var i4/*14*/_c = c/*15*/4;
/////** Class with statics*/
////class c/*16*/5 {
////    static s1: number;
////}
////var i/*17*/5 = new c/*31*/5();
////var i5_/*19*/c = c/*20*/5;
/////** class with statics and constructor*/
////class c/*21*/6 {
////    /** s1 comment*/
////    static s1: number;
////    /** constructor comment*/
////    constructor() {
////    }
////}
////var i/*22*/6 = new c/*32*/6();
////var i6/*24*/_c = c/*25*/6;
////
////class a {
////    /**
////    constructor for a
////    @param a this is my a
////    */
////    constructor(a: string) {
////    }
////}
////new a("Hello");
////module m {
////    export module m2 {
////        /** class comment */
////        export class c1 {
////            /** constructor comment*/
////            constructor() {
////            }
////        }
////    }
////}
////var myVar = new m.m2.c/*33*/1();

verify.baselineQuickInfo()
