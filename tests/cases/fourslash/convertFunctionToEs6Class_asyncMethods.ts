/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////export function /**/MyClass() {
////}
////MyClass.prototype.foo = async function() {
////    await 2;
////}
////MyClass.bar = async function() {
////    await 3;
////}

verify.applicableRefactorAvailableAtMarker("");
verify.fileAfterApplyingRefactorAtMarker("",
`export class MyClass {
    constructor() {
    }
    async foo() {
        await 2;
    }
    static async bar() {
        await 3;
    }
}
`,
'Convert to ES2015 class', 'convert');
