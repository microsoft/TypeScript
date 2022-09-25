/// <reference path='fourslash.ts'/>

// @Filename: referencesForGlobals_1.ts
/////*1*/declare module "/*2*/foo" {
////    var f: number;
////}

// @Filename: referencesForGlobals_2.ts
/////*3*/import f = require("/*4*/foo");

verify.baselineFindAllReferences('1', '2', '3', '4');
