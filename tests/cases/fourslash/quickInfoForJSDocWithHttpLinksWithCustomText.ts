/// <reference path='fourslash.ts' />
// @checkJs: true
// @filename: quickInfoForJSDocWithHttpLinksWithCustomText.js
// #51133

//// /** {@link https://hva Go to URL} */
//// var /*1*/myVar1 = true
////
//// /** {@link https://hva|Go to URL} */
//// var /*2*/MyVar2 = true
////
//// /** @see {@link https://hva Go to URL} */
//// var /*3*/myVar3 = true
////
//// /** @see {@link https://hva|Go to URL} */
//// var /*4*/MyVar4 = true

verify.baselineQuickInfo();
