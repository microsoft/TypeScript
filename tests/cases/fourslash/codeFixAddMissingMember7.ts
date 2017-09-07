/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////[|class C {
////    static p = ()=>{ this.foo === 10 };
////}
////|]

verify.getAndApplyCodeFix(/*errorCode*/ undefined, /*index*/ 2)
verify.currentFileContentIs(`class C {
    static p = ()=>{ this.foo === 10 };
}
C.foo = undefined;
`);
