/// <reference path='fourslash.ts' />

////function /*1*/makePoint(x: number) { 
////    return {
////        get x() { return x; },
////    };
////};
////var /*4*/point = makePoint(2);
////var /*2*/x = point./*3*/x;

goTo.marker('1');
verify.quickInfoIs("(x: number): { x: number; }", undefined, "makePoint", "function");

goTo.marker('2');
verify.quickInfoIs("number", undefined, "x", "var");

goTo.marker('3');
verify.memberListContains("x", "number", undefined, "x", "property");

goTo.marker('4');
verify.quickInfoIs("{ x: number; }", undefined, "point", "var");
