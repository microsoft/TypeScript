/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: /a.js
////function /**/MyClass() {}
////MyClass.prototype.foo = function() {
////    try {} catch() {}
////}

verify.applicableRefactorAvailableAtMarker("");
verify.fileAfterApplyingRefactorAtMarker("",
`class MyClass {
    constructor() { }
    foo() {
        try { }
        catch () { }
    }
}
`,
'Convert to ES2015 class', 'convert');
