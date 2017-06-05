/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////[|class C {
////    static method() {
////        ()=>{ this.foo === 10 };
////    }
////}
////|]

verify.getAndApplyCodeFix(/*errorCode*/ undefined, /*index*/ 0);
verify.currentFileContentIs(`class C {
    static method() {
        ()=>{ this.foo === 10 };
    }
}
C.foo = undefined;
`);