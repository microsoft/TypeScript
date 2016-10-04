
///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * @param {{ stringProp: string,
//// *           numProp: number }} o
//// */
////function f1(o) {
////    o/**/;
////}
goTo.marker();
verify.quickInfoIs("(parameter) o: any");
