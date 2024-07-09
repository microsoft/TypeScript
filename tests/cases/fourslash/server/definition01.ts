/// <reference path="../fourslash.ts"/>

// @Filename: b.ts
////import n = require([|'./a/*1*/'|]);
////var x = new n.Foo();

// @Filename: a.ts
//// /*2*/export class Foo {}

verify.baselineGoToDefinition("1");
