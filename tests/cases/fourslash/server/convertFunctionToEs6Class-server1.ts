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
`// Comment
class fn {\r
    constructor() {\r
        this.baz = 10;\r
    }\r
    bar() {\r
        console.log('hello world');\r
    }\r
}\r
`,
});
