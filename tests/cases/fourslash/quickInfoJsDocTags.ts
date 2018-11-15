/// <reference path='fourslash.ts'/>

// @Filename: quickInfoJsDocTags.ts
/////**
//// * Doc
//// * @author Me
//// * @augments {C<T>} Augments it
//// * @template T A template
//// * @type {number | string} A type
//// * @typedef {number | string} NumOrStr
//// * @property {number} x The prop
//// * @param {number} x The param
//// * @returns The result
//// */
////function /**/foo(x) {}

verify.baselineQuickInfo();
