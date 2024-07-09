/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @param {number} [a] */
////function /**/f(a) { }

verify.quickInfoAt("", "function f(a?: number): void");