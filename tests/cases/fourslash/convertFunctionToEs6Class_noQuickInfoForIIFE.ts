/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////(/*1*/function () {
////   const foo = () => {
////        this.x = 10;
////   };
////   foo;
////})();

goTo.marker("1");
verify.not.codeFixAvailable()
