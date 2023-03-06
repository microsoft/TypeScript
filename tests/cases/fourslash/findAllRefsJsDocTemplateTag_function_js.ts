/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: /a.js

/////**
//// * @template /*1*/T
//// * @return {/*2*/T}
//// */
////function f() {}

verify.baselineFindAllReferences('1', '2');
