/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: index.js
//// /**
////  * @typedef {{
////  *   [|foo|]: string;
////  *   [|bar|]: number;
////  * }} Foo
////  */
//// 
//// /** @type {Foo} */
//// const x = {
////   [|foo|]: "",
////   [|bar|]: 42,
//// };

verify.baselineDocumentHighlights();
