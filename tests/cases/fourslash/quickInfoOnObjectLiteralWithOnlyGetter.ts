/// <reference path='fourslash.ts' />

////function /*1*/makePoint(x: number) {
////    return {
////        get x() { return x; },
////    };
////};
////var /*4*/point = makePoint(2);
////var /*2*/x = point./*3*/x;

verify.quickInfos({
    1: "function makePoint(x: number): {\n    readonly x: number;\n}",
    2: "var x: number",
    4: "var point: {\n    readonly x: number;\n}",
});

verify.completions({ marker: "3", exact: { name: "x", text: "(property) x: number" } });
