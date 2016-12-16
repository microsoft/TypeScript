///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * @param {string} p0
//// * @param {string} [p1]
//// */
////function Test(p0, p1) {
////    this.P0 = p0;
////    this.P1 = p1;
////}
////
////
////var /**/test = new Test("");
goTo.marker();
verify.quickInfoIs('var test: {\n    P0: string;\n    P1: string;\n}');
