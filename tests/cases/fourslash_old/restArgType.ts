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
////var t3: (a1: number, a2: boolean, ...c: string[]) => void  = (f1/*t31*/, .../*t32*/f2) => { }; // f1 => number, f2 => any[]
////var t4: (...a1: string[]) => void = (.../*t4*/f1) => { };      // f1 => string[]
////var t5: (...a1: string[]) => void = (/*t5*/f1) => { };         // f1 => string
////var t6: (...a1: string[]) => void = (/*t61*/f1, .../*t62*/f2) => { };  // f1 => string, f2 => string[]
////var t7: (...a1: string[]) => void = (/*t71*/f1, /*t72*/f2, /*t73*/f3) => { }; // fa => string, f2 => string, f3 => string
////// Explicit type annotation
////var t8: (...a1: string[]) => void = (/*t8*/f1: number[]) => { };
////// Explicit initialization value
////var t9: (a1: string[], a2: string[]) => void = (/*t91*/f1 = 4, /*t92*/f2 = [false, true]) => { };

goTo.marker("1");
verify.quickInfoIs("(parameter) restArgs: any[]", "");
goTo.marker("2");
verify.quickInfoIs("(parameter) restArgs: any[]", "");

goTo.marker("3");
verify.quickInfoIs("(parameter) y: string[]", "");

goTo.marker("4");
verify.quickInfoIs("(parameter) y1: string[]", "");
goTo.marker("5");
verify.quickInfoIs("(parameter) y2: string", "");

goTo.marker("t1");
verify.quickInfoIs("(parameter) f1: any[]", "");

goTo.marker("t2");
verify.quickInfoIs("(parameter) f1: any[]", "");

goTo.marker("t31");
verify.quickInfoIs("(parameter) f1: number", "");
goTo.marker("t32");
verify.quickInfoIs("(parameter) f2: any[]", "");

goTo.marker("t4");
verify.quickInfoIs("(parameter) f1: string[]", "");

goTo.marker("t5");
verify.quickInfoIs("(parameter) f1: string", "");

goTo.marker("t61");
verify.quickInfoIs("(parameter) f1: string", "");
goTo.marker("t62");
verify.quickInfoIs("(parameter) f2: string[]", "");

goTo.marker("t71");
verify.quickInfoIs("(parameter) f1: string", "");
goTo.marker("t72");
verify.quickInfoIs("(parameter) f2: string", "");
goTo.marker("t73");
verify.quickInfoIs("(parameter) f3: string", "");

goTo.marker("t8");
verify.quickInfoIs("(parameter) f1: number[]", "");

goTo.marker("t91");
verify.quickInfoIs("(parameter) f1: string[]", "");
goTo.marker("t92");
verify.quickInfoIs("(parameter) f2: string[]", "");