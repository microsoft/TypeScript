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
////         a./**/
////     }
//// }

goTo.marker();
verify.completionListContains('toFixed', undefined, undefined, 'method');
