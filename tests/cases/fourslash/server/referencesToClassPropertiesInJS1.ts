/// <reference path="../fourslash.ts"/>

// @allowJs: true
// @checkJs: true
// @Filename: /my-test-file.js
////export class Foo {
////	constructor() {
////    this.bar = false;
////		this./*1*/bar = true;
////	}
////
////	get bar() {
////		return true
////	}
////
////	set bar(value) {
////		// Do something with value
////	}
////}
////
/////** @type {Foo[]} */
////const items = [];
////
////for (const item of items) {
////    item.bar = true;
////}

verify.baselineFindAllReferences('1')