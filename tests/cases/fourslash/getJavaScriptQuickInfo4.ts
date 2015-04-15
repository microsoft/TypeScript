/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @param {[number,string]} [a] */
////function /**/f(a) { }

debugger;
goTo.marker();
verify.quickInfoIs('function f(a?: [number, string]): void');