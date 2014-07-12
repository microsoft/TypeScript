/// <reference path='fourslash.ts' />

////function /*1*/makePoint(x: number) { 
////    return {
////        b: 10,
////        set x(a: number) { this.b = a; }
////    };
////};
////var /*3*/point = makePoint(2);
////point./*2*/x = 30;

goTo.marker('1');
verify.quickInfoIs("(x: number): { b: number; x: number; }", undefined, "makePoint", "function");

goTo.marker('2');
verify.memberListContains("x", "number", undefined, "x", "property");
verify.memberListContains("b", "number", undefined, "b", "property");

goTo.marker('3');
verify.quickInfoIs("{ b: number; x: number; }", undefined, "point", "var");