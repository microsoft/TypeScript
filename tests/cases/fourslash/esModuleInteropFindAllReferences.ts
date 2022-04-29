/// <reference path="fourslash.ts"/>

// @esModuleInterop: true

// @Filename: /abc.d.ts
////declare module "a" {
////    /*1*/export const /*2*/x: number;
////}

// @Filename: /b.ts
////import a from "a";
////a./*3*/x;

verify.baselineFindAllReferences('1', '2', '3');
