/// <reference path='fourslash.ts' />

////interface I</*1*/T> { a: /*2*/T }
////interface I</*3*/T> { b: /*4*/T }

verify.baselineFindAllReferences('1', '2', '3', '4');
