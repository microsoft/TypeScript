/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitAny: true
// @strictNullChecks: true
// @Filename: important.js
////class C {
////    constructor() {
////        /** this is fine */
////        this.p = undefined;
////        this.q = undefined
////    }
////    method() {
////        this.p.push(1)
////        this.q.push(1);
////    }
////}

// Note: Should be number[] | undefined, but inference currently privileges assignments
// over usage (even when the only result is undefined) and infers only undefined.
verify.codeFixAll({
    fixId: "inferFromUsage",
    fixAllDescription: "Infer all types from usage",
    newFileContent:
`class C {
    constructor() {
        /**
         * this is fine
         * @type {number[] | undefined}
         */
        this.p = undefined;
        /** @type {number[] | undefined} */
        this.q = undefined
    }
    method() {
        this.p.push(1)
        this.q.push(1);
    }
}`});
