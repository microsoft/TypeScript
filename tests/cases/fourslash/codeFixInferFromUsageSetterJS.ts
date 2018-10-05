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

verify.fileAfterCodeFix(
`
class C {
    /**
     * @param {number} v
     */
    set x(v) {
        v;
    }
}
(new C).x = 1;`, undefined, 2);
