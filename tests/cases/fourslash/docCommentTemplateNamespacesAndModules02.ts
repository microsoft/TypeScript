/// <reference path='fourslash.ts' />

/////*top*/
////namespace n1.
////    /*n2*/ n2.
////    /*n3*/ n3 {
////}

verify.docCommentTemplateAt("top", /*indentation*/ 3,
"/** */");

verify.noDocCommentTemplateAt("n2");

verify.noDocCommentTemplateAt("n3");
