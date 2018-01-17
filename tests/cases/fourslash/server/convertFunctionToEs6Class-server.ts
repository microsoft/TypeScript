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
// NOTE: '// Comment' should be included, but due to incorrect handling of trivia,
// it's omitted right now.
verify.fileAfterApplyingRefactorAtMarker('1',
`class fn {\r
    constructor() {\r
        this.baz = 10;\r
    }\r
    bar() {\r
        console.log('hello world');\r
    }\r
}\r
`, 'Convert to ES2015 class', 'convert');
