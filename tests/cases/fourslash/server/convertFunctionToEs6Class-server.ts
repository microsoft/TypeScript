// @allowNonTsExtensions: true
// @Filename: test123.js

/// <reference path="../fourslash.ts" />

//// // Comment
//// function fn() {
////     this.baz = 10;
//// }
//// /*1*/fn.prototype.bar = function () {
////     console.log('hello world');
//// }

verify.applicableRefactorAvailableAtMarker('1');
verify.fileAfterApplyingRefactorAtMarker('1',
`// Comment
class fn {
    constructor() {
        this.baz = 10;
    }
    bar() {
        console.log('hello world');
    }
}
`, 'Convert to ES2015 class', 'convert');
