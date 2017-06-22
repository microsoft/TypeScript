/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
//// function fn() {
////     this.x = 100;
//// }
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
        this.x = 100;
    }
    /**
      * This is a cool function!
    */
    bar(x, y, z) {
        this.x = y;
    }
}

`, 'Convert to ES2015 class', 'convert');
