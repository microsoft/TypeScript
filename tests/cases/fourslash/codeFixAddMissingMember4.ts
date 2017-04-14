/// <reference path='fourslash.ts' />

// @checkJs: true
// @allowJs: true

// @Filename: a.js
////[|class C {
////    constructor() {
////    }
////    method() {
////        this.foo === 10;
////    }
////}|]

verify.rangeAfterCodeFix(`class C {
    constructor() {
    this.foo = undefined;
}
    method() {
        this.foo === 10;
    }
}`, /*includeWhiteSpace*/false, /*errorCode*/ undefined, /*index*/ 0);