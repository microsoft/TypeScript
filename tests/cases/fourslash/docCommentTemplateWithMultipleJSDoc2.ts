/// <reference path='fourslash.ts' />

/////** @typedef {string} Id */
////
/////** /**/ */
////function foo(x, y, z) {}

verify.docCommentTemplateAt("", 7,
`/**
 * 
 * @param x
 * @param y
 * @param z
 */`);
