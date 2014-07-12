/// <reference path="fourslash.ts"/>

////class Test {
////    private _priv(...restArgs/*1*/) {
////    }
////    public pub(...restArgs/*2*/) {
////        var x = restArgs[2];
////    }
////}
////var x: (...y: string[]) => void = function (...y/*3*/) {
////    var t = y;
////};
////function foo(x: (...y: string[]) => void ) { }
////foo((...y1/*4*/) => {
////    var t = y;
////});
////foo((y2/*5*/) => {
////    var t = y;
////});
////var t1 :(a1: string, a2: string) => void = (...f1/*t1*/) => { }  // f1 => any[];
////var t2: (a1: string, ...a2: string[]) => void = (...f1/*t2*/) => { } // f1 => any[];
////var t3: (a1: number, a2: boolean, ...c: string[]) => void  = (f1/*t31*/, ...f2/*t32*/) => { }; // f1 => number, f2 => any[]
////var t4: (...a1: string[]) => void = (...f1/*t4*/) => { };      // f1 => string[]
////var t5: (...a1: string[]) => void = (f1/*t5*/) => { };         // f1 => string
////var t6: (...a1: string[]) => void = (f1/*t61*/, ...f2/*t62*/) => { };  // f1 => string, f2 => string[]
////var t7: (...a1: string[]) => void = (f1/*t71*/, f2/*t72*/, f3/*t73*/) => { }; // fa => string, f2 => string, f3 => string
////// Explicit type annotation
////var t8: (...a1: string[]) => void = (f1/*t8*/: number[]) => { };
////// Explicit initialization value
////var t9: (a1: string[], a2: string[]) => void = (f1/*t91*/ = 4, f2/*t92*/ = [false, true]) => { };

goTo.marker("1");
verify.quickInfoIs("any[]", "", "restArgs", "parameter");
goTo.marker("2");
verify.quickInfoIs("any[]", "", "restArgs", "parameter");

goTo.marker("3");
verify.quickInfoIs("string[]", "", "y", "parameter");

goTo.marker("4");
verify.quickInfoIs("string[]", "", "y1", "parameter");
goTo.marker("5");
verify.quickInfoIs("string", "", "y2", "parameter");

goTo.marker("t1");
verify.quickInfoIs("any[]", "", "f1", "parameter");

goTo.marker("t2");
verify.quickInfoIs("any[]", "", "f1", "parameter");

goTo.marker("t31");
verify.quickInfoIs("number", "", "f1", "parameter");
goTo.marker("t32");
verify.quickInfoIs("any[]", "", "f2", "parameter");

goTo.marker("t4");
verify.quickInfoIs("string[]", "", "f1", "parameter");

goTo.marker("t5");
verify.quickInfoIs("string", "", "f1", "parameter");

goTo.marker("t61");
verify.quickInfoIs("string", "", "f1", "parameter");
goTo.marker("t62");
verify.quickInfoIs("string[]", "", "f2", "parameter");

goTo.marker("t71");
verify.quickInfoIs("string", "", "f1", "parameter");
goTo.marker("t72");
verify.quickInfoIs("string", "", "f2", "parameter");
goTo.marker("t73");
verify.quickInfoIs("string", "", "f3", "parameter");

goTo.marker("t8");
verify.quickInfoIs("number[]", "", "f1", "parameter");

goTo.marker("t91");
verify.quickInfoIs("string[]", "", "f1", "parameter");
goTo.marker("t92");
verify.quickInfoIs("string[]", "", "f2", "parameter");