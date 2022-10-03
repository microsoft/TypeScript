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

verify.codeFix({
    description: "Convert function to an ES2015 class",
    newFileContent:
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
});
