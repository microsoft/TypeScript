/// <reference path='fourslash.ts' />
// @checkJs: true
// @filename: quickInfoForJSDocWithHttpLinks.js

//// /** @typedef {number} /*1*/https://wat */
////
//// /**
//// * @typedef {Object} Oops
//// * @property {number} /*2*/https://wass
//// */
////
////
//// /** @callback /*3*/http://vad */
////
//// /** @see https://hvad */
//// var /*4*/see1 = true
////
//// /** @see {@link https://hva} */
//// var /*5*/see2 = true
////
//// /** {@link https://hvaD} */
//// var /*6*/see3 = true

verify.baselineQuickInfo();
