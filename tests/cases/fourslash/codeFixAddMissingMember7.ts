/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////[|class C {
////    static p = ()=>{ this.foo === 10 };
////}
////|]

verify.rangeAfterCodeFix(`class C {
    static p = ()=>{ this.foo === 10 };
}
C.foo = undefined;`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 2);