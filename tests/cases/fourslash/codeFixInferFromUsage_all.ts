/// <reference path='fourslash.ts' />

// @noImplicitAny: true

////function f(x, y) {
////    x += 0;
////    y += "";
////}
////
////function g(z) {
////    return z * 2;
////}

verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`function f(x: number, y: string) {
    x += 0;
    y += "";
}

function g(z: number) {
    return z * 2;
}`,
});
