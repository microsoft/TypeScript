/// <reference path='fourslash.ts' />

/////** /**/ */
////function f(p) { return p; }
////
/////** Doc/*1*/ */
////function g(p) { return p; }

verify.docCommentTemplateAt("", /*newTextOffset*/ 7,
`/**
 * 
 * @param p
 * @returns
 */`);

verify.noDocCommentTemplateAt("1");
