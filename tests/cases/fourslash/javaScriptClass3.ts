///<reference path="fourslash.ts" />

// In an inferred class, we can go-to-def successfully

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        this./*dst1*/alpha = 10;
////        this./*dst2*/beta = 'gamma';
////    }
////    method() { return this.alpha; }
//// }
//// var x = new Foo();
//// x.[|alpha/*src1*/|];
//// x.[|beta/*src2*/|];

verify.baselineGoToDefinition(
    "src1",
    "src2",
);
