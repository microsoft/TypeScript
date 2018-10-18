/// <reference path='fourslash.ts' />

// @Filename: indents.ts
////    a   /*2*/
////    /*1*/
/////*0*/        function foo() { }

const singleLineComment = "/** */";

verify.docCommentTemplateAt("0", 3, singleLineComment);
verify.docCommentTemplateAt("1", 3, singleLineComment);
verify.docCommentTemplateAt("2", 3, singleLineComment);
