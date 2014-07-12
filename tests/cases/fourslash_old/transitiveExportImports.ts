/// <reference path='fourslash.ts'/>

// @Filename: a.ts
////class A {
////}
////export = A;

// @Filename: b.ts
////export import a = require('./a');

// @Filename: c.ts
////import b = require('./b');
////var a = new b.a/**/();

goTo.marker();
verify.quickInfoExists();
verify.numberOfErrorsInCurrentFile(0);