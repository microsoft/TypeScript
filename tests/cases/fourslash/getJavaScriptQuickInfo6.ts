/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {function(this:number)} */
////function f() { /**/this }

debugger;
goTo.marker();
verify.quickInfoIs('number');