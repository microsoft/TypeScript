/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @param {number[]} [a] */
////function /**/f(a) { }

goTo.marker();
verify.quickInfoIs('function f(a?: number[]): void');