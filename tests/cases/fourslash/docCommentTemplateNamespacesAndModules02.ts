/// <reference path='fourslash.ts' />

/////*top*/
////namespace n1.
////    /*n2*/ n2.
////    /*n3*/ n3 {
////}

verify.docCommentTemplateAt("top", /*indentation*/ 8,
`/**
 * 
 */`);

verify.emptyDocCommentTemplateAt("n2");

verify.emptyDocCommentTemplateAt("n3");
