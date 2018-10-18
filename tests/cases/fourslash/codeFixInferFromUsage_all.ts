/// <reference path='fourslash.ts' />

// @noImplicitAny: true
// @strictNullChecks: true

////function f(x, y) {
////    x += 0;
////    y += "";
////}
////
////function g(z) {
////    return z * 2;
////}
////
////let x = null;
////function h() {
////    if (!x) x = 2;
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
}

let x: number | null = null;
function h() {
    if (!x) x = 2;
}`,
});
