/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {};
////declare global {
////    /*1*/function /*2*/f(): void;
////}

// @Filename: /b.ts
/////*3*/f();

verify.noErrors();
verify.baselineFindAllReferences('1', '2', '3');
