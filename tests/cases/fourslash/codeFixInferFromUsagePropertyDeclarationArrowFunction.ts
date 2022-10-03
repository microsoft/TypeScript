/// <reference path='fourslash.ts' />

// @noImplicitAny: true
// @Filename: test.ts
////class MyClass {
////    bar = (a, b, c, d, e, f) => {};
////};
////
////interface I {
////    x: number;
////}
////
////enum E {
////    X
////}
////
////function foo(x: MyClass) {
////    const a = 1;
////    const b = "";
////    const c = { x: 1, y: 1 };
////    const d = [1, 2, 3];
////    const e: I = { x: 1 };
////    const f: E = E.X;
////    x.bar(a, b, c, d, e, f);
////}

verify.codeFixAll({
  fixId: "inferFromUsage",
  fixAllDescription: "Infer all types from usage",
  newFileContent:
`class MyClass {
    bar = (a: number, b: string, c: { x: number; y: number; }, d: number[], e: I, f: E) => {};
};

interface I {
    x: number;
}

enum E {
    X
}

function foo(x: MyClass) {
    const a = 1;
    const b = "";
    const c = { x: 1, y: 1 };
    const d = [1, 2, 3];
    const e: I = { x: 1 };
    const f: E = E.X;
    x.bar(a, b, c, d, e, f);
}`,
});
