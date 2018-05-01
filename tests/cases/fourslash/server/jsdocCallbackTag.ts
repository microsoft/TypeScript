/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCallbackTag.js

//// /**
////  * @callback FooHandler
////  * @param {string} eventName - So many words
////  * @param eventName2 {number | string} - Silence is golden
////  * @param eventName3 - Osterreich mos def
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
////  * @type {FooHandler2} callback
////  */
//// var t2/*2*/;


goTo.marker("1");
verify.quickInfoIs("var t: (eventName: string, eventName2: number | string, eventName3: any) => void");
goTo.marker("2");
verify.quickInfoIs("var t2: (eventName?: string, eventName2?: string) => void"); 
