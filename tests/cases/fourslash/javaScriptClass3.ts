///<reference path="fourslash.ts" />

// In an inferred class, we can to-to-def successfully

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// class Foo {
////    constructor() {
////        /*dst1*/this.alpha = 10;
////        /*dst2*/this.beta = 'gamma';
////    }
////    method() { return this.alpha; }
//// }
//// var x = new Foo();
//// x.alpha/*src1*/;
//// x.beta/*src2*/;

verify.goToDefinition({
    src1: "dst1",
    src2: "dst2"
});
