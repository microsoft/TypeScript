/// <reference path='fourslash.ts' />

////interface Options {
////    run(a, b, c, d, e, f): void;
////}
////
////interface I {
////    x: number;
////}
////
////enum E {
////    X
////}
////
////function foo(options: Options) {
////    const a = 1;
////    const b = "";
////    const c = { x: 1, y: 1 };
////    const d = [1, 2, 3];
////    const e: I = { x: 1 };
////    const f: E = E.X;
////
////    options.run(a, b, c, d, e, f);
////}

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`interface Options {
    run(a: number, b: string, c: { x: number; y: number; }, d: number[], e: I, f: E): void;
}

interface I {
    x: number;
}

enum E {
    X
}

function foo(options: Options) {
    const a = 1;
    const b = "";
    const c = { x: 1, y: 1 };
    const d = [1, 2, 3];
    const e: I = { x: 1 };
    const f: E = E.X;

    options.run(a, b, c, d, e, f);
}`,
});
