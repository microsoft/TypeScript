/// <reference path='fourslash.ts' />

/////*namespaceN*/
////namespace n {
////}
////
/////*namespaceM*/
////module m {
////}
////
/////*ambientModule*/
////module "ambientModule" {
////}

verify.docCommentTemplateAt("namespaceN", /*indentation*/ 8,
`/**
 * 
 */`);

verify.docCommentTemplateAt("namespaceM", /*indentation*/ 8,
`/**
 * 
 */`);

verify.docCommentTemplateAt("namespaceM", /*indentation*/ 8,
`/**
 * 
 */`);
