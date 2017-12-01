/// <reference path='fourslash.ts' />

// @Filename: functionDecl.ts
////f/*0*/unction /*1*/foo/*2*/(/*3*/) /*4*/{ /*5*/}

verify.noDocCommentTemplateAt("0");

verify.docCommentTemplateAt("1", 3, "/** */");
verify.docCommentTemplateAt("2", 3, "/** */");
verify.docCommentTemplateAt("3", 3, "/** */");
verify.docCommentTemplateAt("4", 3, "/** */");
verify.docCommentTemplateAt("5", 3, "/** */");
