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
verify.completions({ includes: { name: "toFixed", kind: "method", kindModifiers: "declare" } });

goTo.marker('b');
edit.insert('.');
verify.completions({ includes: { name: "substring", kind: "method", kindModifiers: "declare" } });
