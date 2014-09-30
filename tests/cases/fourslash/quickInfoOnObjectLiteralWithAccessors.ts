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
verify.quickInfoIs("(function) makePoint(x: number): {\n    b: number;\n    x: number;\n}", undefined);

goTo.marker('2');
verify.quickInfoIs("(var) x: number", undefined);

goTo.marker('3');
verify.memberListContains("x", "(property) x: number", undefined);
verify.memberListContains("b", "(property) b: number", undefined);
verify.quickInfoIs("(property) x: number", undefined);

goTo.marker('4');
verify.quickInfoIs("(var) point: {\n    b: number;\n    x: number;\n}", undefined);