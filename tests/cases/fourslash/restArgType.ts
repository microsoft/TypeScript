/// <reference path="fourslash.ts"/>

////class Test {
////    private _priv(.../*1*/restArgs) {
////    }
////    public pub(.../*2*/restArgs) {
////        var x = restArgs[2];
////    }
////}
////var x: (...y: string[]) => void = function (.../*3*/y) {
////    var t = y;
////};
////function foo(x: (...y: string[]) => void ) { }
////foo((.../*4*/y1) => {
////    var t = y;
////});
////foo((/*5*/y2) => {
////    var t = y;
////});
////var t1 :(a1: string, a2: string) => void = (.../*t1*/f1) => { }  // f1 => any[];
////var t2: (a1: string, ...a2: string[]) => void = (.../*t2*/f1) => { } // f1 => any[];
////var t3: (a1: number, a2: boolean, ...c: string[]) => void  = (/*t31*/f1, .../*t32*/f2) => { }; // f1 => number, f2 => any[]
////var t4: (...a1: string[]) => void = (.../*t4*/f1) => { };      // f1 => string[]
////var t5: (...a1: string[]) => void = (/*t5*/f1) => { };         // f1 => string
////var t6: (...a1: string[]) => void = (/*t61*/f1, .../*t62*/f2) => { };  // f1 => string, f2 => string[]
////var t7: (...a1: string[]) => void = (/*t71*/f1, /*t72*/f2, /*t73*/f3) => { }; // fa => string, f2 => string, f3 => string
////// Explicit type annotation
////var t8: (...a1: string[]) => void = (/*t8*/f1: number[]) => { };
////// Explicit initialization value
////var t9: (a1: string[], a2: string[]) => void = (/*t91*/f1 = 4, /*t92*/f2 = [false, true]) => { };

verify.quickInfos({
    1: "(parameter) restArgs: any[]",
    2: "(parameter) restArgs: any[]",

    3: "(parameter) y: string[]",

    4: "(parameter) y1: string[]",
    5: "(parameter) y2: string",

    t1: "(parameter) f1: [a1: string, a2: string]",

    t2: "(parameter) f1: [a1: string, ...a2: string[]]",

    t31: "(parameter) f1: number",
    t32: "(parameter) f2: [a2: boolean, ...c: string[]]",

    t4: "(parameter) f1: string[]",
    t5: "(parameter) f1: string",

    t61: "(parameter) f1: string",
    t62: "(parameter) f2: string[]",

    t71: "(parameter) f1: string",
    t72: "(parameter) f2: string",
    t73: "(parameter) f3: string",

    t8: "(parameter) f1: number[]",

    t91: "(parameter) f1: string[]",
    t92: "(parameter) f2: string[]"
});
