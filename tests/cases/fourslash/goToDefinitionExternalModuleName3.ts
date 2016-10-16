/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import n = require('e/*1*/');
////var x = new n.Foo();

// @Filename: a.ts
/////*2*/declare module "e" {
////    class Foo { }
////}

verify.goToDefinition("1", "2");
