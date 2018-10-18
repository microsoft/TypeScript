/// <reference path='fourslash.ts' />
// @allowJs: true
// @checkJs: true
// @Filename: important.js

/////** @param x no types here! */
/////**
//// * 1
//// * @param x a duplicate!
//// * @param y yy
//// */
/////**
//// * 2
//// * @param z zz
//// */
////// @ts-ignore
////function f([|x|]) {
////    return x * 1
////}
////

verify.getSuggestionDiagnostics([]);

