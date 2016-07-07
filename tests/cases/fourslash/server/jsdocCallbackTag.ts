/// <reference path="../fourslash.ts"/>

// @allowNonTsExtensions: true
// @Filename: jsdocCallbackTag.js

//// /**
////  * @callback FooHandler
////  * @param {string} eventName
////  * @param eventName2 {number | string}
////  * @param eventName3
////  */
//// /**
////  * @type {FooHandler} callback
////  */
//// var t/*1*/;
////
//// /**
////  * @callback FooHandler2
////  * @param {string=} eventName
////  * @param {string} [eventName2]
////  */
//// /**
////  * @type {FooHandler2} callback
////  */
//// var t2/*2*/;


goTo.marker("1");
verify.quickInfoIs("var t: (eventName: string, eventName2: number | string, eventName3: any) => void");
goTo.marker("2");
verify.quickInfoIs("var t2: (eventName?: string, eventName2?: string) => void");