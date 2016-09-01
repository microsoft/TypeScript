/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {function(new:string,number)} */
////var /**/v;

goTo.marker();
verify.quickInfoIs('var v: new (arg1: number) => string');
