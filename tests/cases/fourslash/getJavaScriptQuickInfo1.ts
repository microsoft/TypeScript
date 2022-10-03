/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {function(new:string,number)} */
////var /**/v;

verify.quickInfoAt("", "var v: new (arg1: number) => string", undefined);
