/// <reference path='fourslash.ts' />

////module M {
////    export interface I { }
////    export class C {
////        static property;
////    }
////    export enum E {
////        value = 0
////    }
////    export module N {
////        export var v;
////    }
////    export var V = 0;
////    export function F() { }
////    export import A = M;
////}
////
////import m = M;
////import c = M.C;
////import e = M.E;
////import n = M.N;
////import v = M.V;
////import f = M.F;
////import a = M.A;
////
////m./*1*/;
////c./*2*/;
////e./*3*/;
////n./*4*/;
////v./*5*/;
////f./*6*/;
////a./*7*/;


// Module m
goTo.marker("1");
verify.memberListContains("I");
verify.memberListContains("C");
verify.memberListContains("E");
verify.memberListContains("N");
verify.memberListContains("V");
verify.memberListContains("F");
verify.memberListContains("A");

// Class C
goTo.marker("2");
verify.memberListContains("property");

// Enum E
goTo.marker("3");
verify.memberListContains("value");

// Module N
goTo.marker("4");
verify.memberListContains("v");

// var V
goTo.marker("5");
verify.memberListContains("toFixed");

// function F
goTo.marker("6");
verify.memberListContains("call");

// alias a
goTo.marker("7");
verify.memberListContains("I");
verify.memberListContains("C");
verify.memberListContains("E");
verify.memberListContains("N");
verify.memberListContains("V");
verify.memberListContains("F");
verify.memberListContains("A");
