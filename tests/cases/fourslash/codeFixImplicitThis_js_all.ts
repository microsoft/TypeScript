/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @noImplicitThis: true

// @Filename: /a.js
////function f() {
////    this.x = 1;
////}
////class C {
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
`/**
 * @class
 */
function f() {
    this.x = 1;
}
class C {
    m() {
        const h = () => {
            this;
        }
    }
}`,
});
