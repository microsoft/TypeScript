/// <reference path='fourslash.ts' />

////function /*1*/makePoint(x: number) { 
////    return {
////        get x() { return x; },
////    };
////};
////var /*4*/point = makePoint(2);
////var /*2*/x = point./*3*/x;

goTo.marker('1');
verify.quickInfoIs("(function) makePoint(x: number): {\n    x: number;\n}", undefined);

goTo.marker('2');
verify.quickInfoIs("(var) x: number", undefined);

goTo.marker('3');
verify.memberListContains("x", "(property) x: number", undefined);

goTo.marker('4');
verify.quickInfoIs("(var) point: {\n    x: number;\n}", undefined);
