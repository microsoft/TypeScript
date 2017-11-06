/// <reference path='fourslash.ts' />

// @allowNonTsExtensions: true
// @Filename: /a.js
////function /**/MyClass() {
////}
////MyClass.prototype.f = function(x) {
////    switch (x) {
////        case 0:
////    }
////}

verify.applicableRefactorAvailableAtMarker("");
verify.fileAfterApplyingRefactorAtMarker("",
`class MyClass {
    constructor() {
    }
    f(x) {
        switch (x) {
            case 0:
        }
    }
}
`,
'Convert to ES2015 class', 'convert');
