/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noEmit: true
// @noImplicitAny: true
// @Filename: important.js
////class C {m(x) {return x;}}
////var c = new C()
////c.m(1)

verify.codeFix({
    description: "Infer parameter types from usage",
    index: 2,
    newFileContent:
`class C {/**
 * @param {number} x
 */
m(x) {return x;}}
var c = new C()
c.m(1)`,
});
