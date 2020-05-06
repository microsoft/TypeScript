/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true

// @Filename: index.js
//// /** /**/ */
//// exports.foo = (a) => {};


verify.docCommentTemplateAt("", 8,
`/**
 * 
 * @param {any} a
 */`);
