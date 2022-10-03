/// <reference path='fourslash.ts' />

// @Filename: justAComment.ts
//// // We want to check off-by-one errors in assessing the end of the comment, so we check twice,
//// // first with a trailing space and then without.
//// // /*0*/ 
//// // /*1*/
//// // We also want to check EOF handling at the end of a comment
//// // /*2*/

for (const marker of test.markers()) {
    verify.noDocCommentTemplateAt(marker);
}
