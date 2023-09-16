/// <reference path='fourslash.ts'/>

////function /*1*/f() {}
/////*2*/f();

verify.baselineFindAllReferences('1', '2');
