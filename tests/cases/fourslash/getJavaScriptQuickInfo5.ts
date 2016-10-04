/// <reference path='fourslash.ts'/>

// @allowNonTsExtensions: true
// @Filename: Foo.js
/////** @param {{b:number}} [a] */
////function /**/f(a) { }

verify.quickInfoAt("", "function f(a?: {\n    b: number;\n}): void");