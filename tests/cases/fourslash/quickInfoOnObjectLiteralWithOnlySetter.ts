/// <reference path='fourslash.ts' />

////function /*1*/makePoint(x: number) {
////    return {
////        b: 10,
////        set x(a: number) { this.b = a; }
////    };
////};
////var /*3*/point = makePoint(2);
////point./*2*/x = 30;

verify.completions({
    marker: "2",
    exact: [
        { name: "b", text: "(property) b: number" },
        { name: "x", text: "(property) x: number" },
    ],
});

verify.quickInfos({
    1: "function makePoint(x: number): {\n    b: number;\n    x: number;\n}",
    2: "(property) x: number",
    3: "var point: {\n    b: number;\n    x: number;\n}",
});
