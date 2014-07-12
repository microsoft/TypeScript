/// <reference path='fourslash.ts' />

////function /*1*/makePoint(x: number) { 
////    return {
////        b: 10,
////        get x() { return x; },
////        set x(a: number) { this.b = a; }
////    };
////};
////var /*4*/point = makePoint(2);
////var /*2*/x = point.x;
////point./*3*/x = 30;

goTo.marker('1');
verify.quickInfoIs("(x: number): { b: number; x: number; }", undefined, "makePoint", "function");

goTo.marker('2');
verify.quickInfoIs("number", undefined, "x", "var");

goTo.marker('3');
verify.memberListContains("x", "number", undefined, "x", "property");
verify.memberListContains("b", "number", undefined, "b", "property");
verify.quickInfoIs("number", undefined, "x", "property");

goTo.marker('4');
verify.quickInfoIs("{ b: number; x: number; }", undefined, "point", "var");