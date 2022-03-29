/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
// @lib: es5
////export function /**/MyClass() {
////}
////MyClass.prototype.foo = async function() {
////    await Promise.resolve();
////}
////MyClass.bar = async function() {
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
`export class MyClass {
    constructor() {
    }
    static async bar() {
        await Promise.resolve();
    }
    async foo() {
        await Promise.resolve();
    }
}
`,
});
