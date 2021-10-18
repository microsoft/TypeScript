/// <reference path='../fourslash.ts'/>

// @Filename: /a.ts
////type Options = "/*0*/option 1" | "option 2";
////let myOption: Options = "/*1*/option 1";

verify.baselineFindAllReferences('0', '1')
