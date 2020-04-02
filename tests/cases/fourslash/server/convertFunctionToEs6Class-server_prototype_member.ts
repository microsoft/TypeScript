// @allowNonTsExtensions: true
// @Filename: test123.js

/// <reference path="../fourslash.ts" />

//// // Comment
//// function /*1*/fn() {
////     this.baz = 10;
//// }
//// fn.prototype = {
////     /** JSDoc */
////     bar: function () {
////         console.log('hello world');
////     }
//// }

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
        `// Comment\r
class fn {\r
    constructor() {\r
        this.baz = 10;\r
    }\r
    /** JSDoc */\r
    bar() {\r
        console.log('hello world');\r
    }\r
}\r
`,
});
