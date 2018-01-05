/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: /a.js
////function /**/MyClass() {
////}
////MyClass.prototype.foo = function() {
////    ({ bar: () => { } })
////}

verify.applicableRefactorAvailableAtMarker("");
verify.fileAfterApplyingRefactorAtMarker("",
`class MyClass {
    constructor() {
    }
    foo() {
        ({ bar: () => { } });
    }
}
`,
'Convert to ES2015 class', 'convert');
