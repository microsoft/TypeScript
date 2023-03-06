/// <reference path='fourslash.ts'/>

// @noEmit: true
// @allowJs: true

// @Filename: quickInfoJsDocTagsCallback.js
/////**
//// * @callback cb/*1*/
//// * @param {string} x - x comment
//// */
////
/////**
//// * @param {/*2*/cb} bar -callback comment
//// */
////function foo(bar) {
////    bar(bar);
////}

verify.baselineQuickInfo();
