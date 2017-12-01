/// <reference path='fourslash.ts' />

// @Filename: regex.ts
////var regex = /*0*///*1*/asdf/*2*/ /*3*///*4*/;

verify.docCommentTemplateAt("0", 3, "/** */");
verify.noDocCommentTemplateAt("1");
verify.noDocCommentTemplateAt("2");
verify.noDocCommentTemplateAt("3");
verify.docCommentTemplateAt("4", 3, "/** */");