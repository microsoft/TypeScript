/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import n = require([|'e/*1*/'|]);
////var x = new n.Foo();

// @Filename: a.ts
////declare module /*2*/"e" {
////    class Foo { }
////}

verify.baselineGoToDefinition("1");
