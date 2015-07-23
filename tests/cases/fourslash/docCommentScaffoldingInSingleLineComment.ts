/// <reference path='fourslash.ts' />

// @Filename: emptyFile.ts
//// // We want to check off-by-one errors in assessing the end of the comment, so we check twice,
//// // first with a trailing space and then without.
//// // /*0*/ 
//// // /*1*/
/////*2*/
//// // We also want to check EOF handling at the end of a comment
//// // /*3*/

goTo.marker("0");
verify.DocCommentScaffolding("/**", 3);

goTo.marker("1");
verify.DocCommentScaffolding("/**", 3);

goTo.marker("2");
verify.DocCommentScaffolding("/** */", 3);

goTo.marker("3");
verify.DocCommentScaffolding("/**", 3);