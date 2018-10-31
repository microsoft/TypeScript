/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @Filename: important.js
////class C {
////    set [|x(v)|] {
////        v;
////    }
////}
////(new C).x = 1;

verify.codeFix({
    description: "Infer type of \'x\' from usage",
    index: 2,
    newFileContent:
`class C {
    /**
     * @param {number} v
     */
    set x(v) {
        v;
    }
}
(new C).x = 1;`,
});
