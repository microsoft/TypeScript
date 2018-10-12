/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: important.js
////class C {
////    constructor() {
////        [|this.p|] = undefined;
////    }
////    method() {
////        this.p.push(1)
////    }
////}


// Note: Should be number[] | undefined, but inference currently privileges assignments
// over usage (even when the only result is undefined) and infers only undefined.
verify.fileAfterCodeFix(
`class C {
    constructor() {
        /** @type {undefined} */
        this.p = undefined;
    }
    method() {
        this.p.push(1)
    }
}
`, undefined, 2);
