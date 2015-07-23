/// <reference path='fourslash.ts' />

// @Filename: emptyFile.ts
////function /*0*/foo/*1*/(/*2*/) /*3*/{ /*4*/}/*5*/

const emptyCompletion = "/** */";
const emptyIndent = 3;

goTo.marker("0");
verify.DocCommentScaffolding(emptyCompletion, emptyIndent);

goTo.marker("1");
verify.DocCommentScaffolding(emptyCompletion, emptyIndent);

goTo.marker("2");
verify.DocCommentScaffolding(emptyCompletion, emptyIndent);

goTo.marker("3");
verify.DocCommentScaffolding(emptyCompletion, emptyIndent);

goTo.marker("4");
verify.DocCommentScaffolding(emptyCompletion, emptyIndent);

goTo.marker("5");
verify.DocCommentScaffolding(emptyCompletion, emptyIndent);
