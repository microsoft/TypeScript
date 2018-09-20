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

verify.quickInfos({
    1: "function makePoint(x: number): {\n    b: number;\n    x: number;\n}",
    2: "var x: number"
});

goTo.marker('3');
verify.completionListContains("x", "(property) x: number", undefined);
verify.completionListContains("b", "(property) b: number", undefined);
verify.quickInfoIs("(property) x: number");

verify.quickInfoAt("4", "var point: {\n    b: number;\n    x: number;\n}");
