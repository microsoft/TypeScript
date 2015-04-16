/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {function(new:string,number)} */
////var /**/v;

debugger;
goTo.marker();
verify.quickInfoIs('var v: new (p1: number) => string');