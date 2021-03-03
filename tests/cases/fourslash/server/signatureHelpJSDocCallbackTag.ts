/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCallbackTag.js
//// /**
////  * @callback FooHandler - A kind of magic
////  * @param {string} eventName - So many words
////  * @param eventName2 {number | string} - Silence is golden
////  * @param eventName3 - Osterreich mos def
////  * @return {number} - DIVEKICK
////  */
//// /**
////  * @type {FooHandler} callback
////  */
//// var t;
////
//// /**
////  * @callback FooHandler2 - What, another one?
////  * @param {string=} eventName - it keeps happening
////  * @param {string} [eventName2] - i WARNED you dog
////  */
//// /**
////  * @type {FooHandler2} callback
////  */
//// var t2;
//// t(/*4*/"!", /*5*/12, /*6*/false);

verify.baselineSignatureHelp()
