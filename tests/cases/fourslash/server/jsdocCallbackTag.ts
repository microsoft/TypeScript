/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCallbackTag.js

//// /**
////  * @callback FooHandler
////  * @param {string} eventName - So many words
////  * @param eventName2 {number | string} - Silence is golden
////  * @param eventName3 - Osterreich mos def
////  * @return {number} - DIVEKICK
////  */
//// /**
////  * @type {FooHandler} callback
////  */
//// var t/*1*/;
////
//// /**
////  * @callback FooHandler2 - What, another one?
////  * @param {string=} eventName - it keeps happening
////  * @param {string} [eventName2] - i WARNED you dog
////  */
//// /**
////  * @type {FooH/*3*/andler2} callback
////  */
//// var t2/*2*/;


goTo.marker("1");
verify.quickInfoIs("var t: (eventName: string, eventName2: string | number, eventName3: any) => number");
goTo.marker("2");
verify.quickInfoIs("var t2: (eventName?: string, eventName2?: string) => any");
goTo.marker("3");
verify.quickInfoIs("type FooHandler2 = (eventName?: string, eventName2?: string) => any");
