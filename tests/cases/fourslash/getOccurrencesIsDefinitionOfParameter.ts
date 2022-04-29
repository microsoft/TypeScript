/// <reference path='fourslash.ts' />
////function f(/*1*/x: number) {
////  return /*2*/x + 1
////}

verify.baselineFindAllReferences('1', '2');
