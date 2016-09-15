/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @type {function(new:string,number)} */
////var /**/v;

verify.quickInfoAt("", "var v: new (p1: number) => string", "@type {function(new:string,number)} ");
