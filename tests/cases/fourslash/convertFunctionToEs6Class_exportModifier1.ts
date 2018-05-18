/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////export function /**/MyClass() {
////}
////MyClass.prototype.foo = function() {
////}

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`export class MyClass {
    constructor() {
    }
    foo() {
    }
}
`,
});
