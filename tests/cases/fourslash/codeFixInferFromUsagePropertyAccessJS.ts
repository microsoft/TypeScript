/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js

////function foo([|a, m, x|]) {
////    a.b.c;
////
////    var numeric = 0;
////    numeric = m.n();
////
////    x.y.z
////    x.y.z.push(0);
////    return x.y.z
////}

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 0,
    newFileContent:
`/**
 * @param {{ b: { c: any; }; }} a
 * @param {{ n: () => number; }} m
 * @param {{ y: { z: number[]; }; }} x
 */
function foo(a, m, x) {
    a.b.c;

    var numeric = 0;
    numeric = m.n();

    x.y.z
    x.y.z.push(0);
    return x.y.z
}`,
});
