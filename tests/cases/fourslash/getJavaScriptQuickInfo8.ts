/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// let x = {
//// 	/** @type {number} */
//// 	get m() {
//// 		return undefined;
//// 	}
//// }
//// x.m/*1*/;
////
//// class Foo {
//// 	/** @type {string} */
//// 	get b() {
//// 		return undefined;
//// 	}
//// }
//// var y = new Foo();
//// y.b/*2*/;

goTo.marker('1');
edit.insert('.');
verify.completionListContains('toFixed', undefined, undefined, 'method');
edit.backspace();

goTo.marker('2');
edit.insert('.');
verify.completionListContains('substr', undefined, undefined, 'method');
