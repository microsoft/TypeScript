/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: test123.js
////export function /**/MyClass() {
////}
////MyClass.prototype.foo = function() {
////}

verify.applicableRefactorAvailableAtMarker("");
verify.fileAfterApplyingRefactorAtMarker("",
`export class MyClass {
    constructor() {
    }
    foo() {
    }
}
`,
'Convert to ES2015 class', 'convert');
