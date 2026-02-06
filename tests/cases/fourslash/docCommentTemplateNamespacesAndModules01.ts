/// <reference path='fourslash.ts' />

/////*namespaceN*/
////namespace n {
////}
////
/////*namespaceM*/
////namespace m {
////}
////
/////*ambientModule*/
////module "ambientModule" {
////}

verify.docCommentTemplateAt("namespaceN", /*indentation*/ 3,
    "/** */");

verify.docCommentTemplateAt("namespaceM", /*indentation*/ 3,
    "/** */");

verify.docCommentTemplateAt("namespaceM", /*indentation*/ 3,
    "/** */");