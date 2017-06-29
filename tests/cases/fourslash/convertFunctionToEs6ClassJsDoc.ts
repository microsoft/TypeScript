/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
//// function fn() {
////     /** neat! */
////     this.x = 100;
//// }
////
//// /** awesome
////   * stuff
////   */
//// fn.prototype.arr = () => { return ""; }
//// /** great */
//// fn.prototype.arr2 = () => [];
//// 
//// /**
////   * This is a cool function!
//// */
//// /*1*/fn.prototype.bar = function (x, y, z) {
////     this.x = y;
//// };

verify.fileAfterApplyingRefactorAtMarker('1',
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
    bar(x, y, z) {
        this.x = y;
    }
}


`, 'Convert to ES2015 class', 'convert');
