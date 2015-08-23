/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
//// function f(a,b) { }
//// /** @type {f} */
//// var v/**/

debugger;
goTo.marker();
verify.quickInfoIs('var v: (a: any, b: any) => void');