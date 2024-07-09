/// <reference path='fourslash.ts' />

/////** */
/////**
//// * 
//// * @param p 
//// */
/////** */
/////*/**/
////function foo(p) {}

verify.docCommentTemplateAt("", 7,
`/**
 * 
 * @param p
 */`);
