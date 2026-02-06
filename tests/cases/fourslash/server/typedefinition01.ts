/// <reference path="../fourslash.ts"/>

// @lib: es5

// @Filename: b.ts
////import n = require('./a');
////var x/*1*/ = new n.Foo();

// @Filename: a.ts
////export class /*2*/Foo {}

verify.baselineGoToType("1");
