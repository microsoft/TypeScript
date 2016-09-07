/// <reference path='fourslash.ts'/>

// @Filename: b.ts
////import * from 'e/*1*/';

// @Filename: a.ts
/////*2*/declare module "e" {
////    class Foo { }
////}

verify.goToDefinition("1", "2");
