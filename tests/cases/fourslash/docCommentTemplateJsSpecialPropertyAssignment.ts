/// <reference path='fourslash.ts' />

// @Filename: /a.js
/////*0*/module.exports = function(a) {};
////const myNamespace  = {};
/////*1*/myNamespace.myExport = function(x) {};

verify.docCommentTemplateAt("0", 7,
`/**
 * 
 * @param {any} a
 */
`);

verify.docCommentTemplateAt("1", 7,
`/**
 * 
 * @param {any} x
 */
`);
