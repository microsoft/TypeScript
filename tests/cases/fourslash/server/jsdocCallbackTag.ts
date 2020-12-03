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
////  * @type {FooHa/*8*/ndler} callback
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
//// t(/*4*/"!", /*5*/12, /*6*/false);

goTo.marker("1");
verify.quickInfoIs("var t: FooHandler");
goTo.marker("2");
verify.quickInfoIs("var t2: FooHandler2");
goTo.marker("3");
verify.quickInfoIs("type FooHandler2 = (eventName?: string | undefined, eventName2?: string) => any", "- What, another one?");
goTo.marker("8");
verify.quickInfoIs("type FooHandler = (eventName: string, eventName2: number | string, eventName3: any) => number", "- A kind of magic");
verify.signatureHelp({
    marker: '4',
    text: "t(eventName: string, eventName2: string | number, eventName3: any): number",
    parameterDocComment: "- So many words",
    tags: [{ name: "type", text: "{FooHandler} callback" }]
});
verify.signatureHelp({
    marker: '5',
    parameterDocComment: "- Silence is golden",
    tags: [{ name: "type", text: "{FooHandler} callback" }]
});
verify.signatureHelp({
    marker: '6',
    parameterDocComment: "- Osterreich mos def",
    tags: [{ name: "type", text: "{FooHandler} callback" }]
});
