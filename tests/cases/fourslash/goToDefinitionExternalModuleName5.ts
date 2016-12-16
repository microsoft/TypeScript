/// <reference path='fourslash.ts'/>

// @Filename: a.ts
/////*2*/declare module "external/*1*/" {
////    class Foo { }
////}

verify.goToDefinition("1", "2");
