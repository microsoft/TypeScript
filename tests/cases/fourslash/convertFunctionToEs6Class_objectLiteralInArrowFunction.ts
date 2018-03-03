/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: /a.js
////function /**/MyClass() {
////}
////MyClass.prototype.foo = function() {
////    ({ bar: () => { } })
////}

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`class MyClass {
    constructor() {
    }
    foo() {
        ({ bar: () => { } });
    }
}
`,
});
