/// <reference path='fourslash.ts' />
////let o = { /*1*/["/*2*/foo"]: 12 };
////let y = o./*3*/foo;
////let z = o['/*4*/foo'];

verify.baselineFindAllReferences('1', '2', '3', '4');
