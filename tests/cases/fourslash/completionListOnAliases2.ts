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
verify.completionListContains("I");
verify.completionListContains("C");
verify.completionListContains("E");
verify.completionListContains("N");
verify.completionListContains("V");
verify.completionListContains("F");
verify.completionListContains("A");

// Class C
goTo.marker("2");
verify.completionListContains("property");

// Enum E
goTo.marker("3");
verify.completionListContains("value");

// Module N
goTo.marker("4");
verify.completionListContains("v");

// var V
goTo.marker("5");
verify.completionListContains("toFixed");

// function F
goTo.marker("6");
verify.completionListContains("call");

// alias a
goTo.marker("7");
verify.completionListContains("I");
verify.completionListContains("C");
verify.completionListContains("E");
verify.completionListContains("N");
verify.completionListContains("V");
verify.completionListContains("F");
verify.completionListContains("A");
