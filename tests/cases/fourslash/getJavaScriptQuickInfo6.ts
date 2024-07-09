/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {function(this:number)} */
////function f() { /**/this }

verify.quickInfoAt("", "number");