/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// /**
////   * @param {number} a
////   * @param {string} b
//// */
//// exports.foo = function(a, b) {
//// 	a/*a*/;
//// 	b/*b*/
//// };

goTo.marker('a');
edit.insert('.');
verify.completionListContains('toFixed', undefined, undefined, 'method');


goTo.marker('b');
edit.insert('.');
verify.completionListContains('substr', undefined, undefined, 'method');
