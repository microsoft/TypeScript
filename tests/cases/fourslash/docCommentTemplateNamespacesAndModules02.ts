/// <reference path='fourslash.ts' />

/////*top*/
////namespace n1.
////    /*n2*/ n2.
////    /*n3*/ n3 {
////}

verify.docCommentTemplateAt("top", /*indentation*/ 3,
"/** */");

verify.docCommentTemplateAt("n2", 3, "/** */");

verify.docCommentTemplateAt("n3", 3, "/** */");
