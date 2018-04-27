/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////function fn() {
////    /** neat! */
////    this.x = 100;
////}
////
/////** awesome
////  * stuff
////  */
////fn.prototype.arr = () => { return ""; }
/////** great */
////fn.prototype.arr2 = () => [];
////
/////**
////  * This is a cool function!
////*/
////fn.prototype.bar = function (y) {
////    this.x = y;
////};

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`class fn {
    constructor() {
        /** neat! */
        this.x = 100;
    }
    /** awesome
      * stuff
      */
    arr() { return ""; }
    /** great */
    arr2() { return []; }
    /**
      * This is a cool function!
    */
    bar(y) {
        this.x = y;
    }
}


`,
});
