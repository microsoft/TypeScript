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
////var tmp: m./*1Type*/;
////c./*2*/;
////e./*3*/;
////n./*4*/;
////v./*5*/;
////f./*6*/;
////a./*7*/;
////var tmp2: a./*7Type*/;

verify.completions(
    // Module m / alias a
    { marker: ["1", "7"], exact: ["F", "C", "E", "N", "V", "A"] },
    { marker: ["1Type", "7Type"], exact: ["I", "C", "E", "A"] },
    // Class C
    { marker: "2", exact: ["prototype", "property", ...completion.functionMembers] },
    // Enum E
    { marker: "3", exact: "value" },
    // Module N
    { marker: "4", exact: "v" },
    // var V
    { marker: "5", includes: "toFixed" },
    // function F
    { marker: "6", includes: "call" },
);
