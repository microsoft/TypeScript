/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /a.js
////class C {
////    q() {
////        function i() {
////            this;
////        }
////    }
////    m() {
////        function h() {
////            this;
////        }
////    }
////}

verify.codeFixAll({
    fixId: "fixImplicitThis",
    fixAllDescription: "Fix all implicit-'this' errors",
    newFileContent:
`class C {
    q() {
        const i = () => {
            this;
        }
    }
    m() {
        const h = () => {
            this;
        }
    }
}`,
});
