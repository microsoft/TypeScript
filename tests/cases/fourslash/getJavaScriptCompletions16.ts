/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// "use strict";
//// 
//// class Something {
//// 
////     /**
////      * @param {number} a
////      */
////     constructor(a, b) {
////         a/*body*/
////     }
////     
////     /**
////      * @param {number} a
////      */
////     method(a) {
////         a/*method*/
////     }
//// }
//// let x = new Something(/*sig*/);

goTo.marker('body');
edit.insert('.');
verify.completionListContains('toFixed', undefined, undefined, 'method');
edit.backspace();

goTo.marker('sig');
verify.currentSignatureHelpIs('Something(a: number, b: any): Something');

goTo.marker('method');
edit.insert('.');
verify.completionListContains('toFixed', undefined, undefined, 'method');
