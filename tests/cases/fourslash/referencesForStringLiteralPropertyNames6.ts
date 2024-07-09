/// <reference path='fourslash.ts'/>

////const x = function () { return 111111; }
////x./*1*/someProperty = 5;
////x["/*2*/someProperty"] = 3;

verify.baselineFindAllReferences('1', '2')
