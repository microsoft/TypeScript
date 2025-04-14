/// <reference path='fourslash.ts'/>

// @Filename: /defA.ts
////declare module "a" {
////    /*1*/export type /*2*/T = number;
////}

// @Filename: /defB.ts
////declare module "b" {
////    export import a = require("a");
////    export const x: a./*3*/T;
////}

// @Filename: /defC.ts
////declare module "c" {
////    import b = require("b");
////    const x: b.a./*4*/T;
////}

verify.noErrors();
verify.baselineFindAllReferences('1', '2', '3', '4');
