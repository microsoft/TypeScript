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

goTo.marker('src1');
goTo.definition();
verify.caretAtMarker('dst1');

goTo.marker('src2');
goTo.definition();
verify.caretAtMarker('dst2');
