///<reference path="fourslash.ts" />
// @allowJs: true
// @Filename: Foo.js
/////**
//// * @param {string} p1 - A string param
//// * @param {string?} p2 - An optional param 
//// * @param {string} [p3] - Another optional param
//// * @param {string} [p4="test"] - An optional param with a default value
//// */
////function f1(p1, p2, p3, p4){}
////f1(/*1*/'foo', /*2*/'bar', /*3*/'baz', /*4*/'qux');
goTo.marker('1');
verify.currentParameterHelpArgumentDocCommentIs("- A string param");
goTo.marker('2');
verify.currentParameterHelpArgumentDocCommentIs("- An optional param ");
goTo.marker('3');
verify.currentParameterHelpArgumentDocCommentIs("- Another optional param");
goTo.marker('4');
verify.currentParameterHelpArgumentDocCommentIs("- An optional param with a default value");
