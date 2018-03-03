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

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
// NOTE: '// Comment' should be included, but due to incorrect handling of trivia,
// it's omitted right now.
`class fn {\r
    constructor() {\r
        this.baz = 10;\r
    }\r
    bar() {\r
        console.log('hello world');\r
    }\r
}\r
`,
});
