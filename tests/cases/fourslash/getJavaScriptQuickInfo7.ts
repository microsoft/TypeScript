/// <reference path="fourslash.ts" />

// @allowNonTsExtensions: true
// @Filename: file.js
//// let x = {
//// 	/** This is cool*/
//// 	get m() {
//// 		return 0;
//// 	}
//// }
//// x.m/*1*/;
////
//// class Foo {
//// 	/** This is cool too*/
//// 	get b() {
//// 		return 0;
//// 	}
//// }
//// var y = new Foo();
//// y.b/*2*/;

goTo.marker('1');
verify.quickInfoIs(undefined, 'This is cool'); 

goTo.marker('2');
verify.quickInfoIs(undefined, 'This is cool too'); 
