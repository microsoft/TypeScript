/// <reference path='fourslash.ts'/>

////const /*1*/x = 1;
////const y: { /*2*/x: number } = { /*3*/x };

verify.baselineFindAllReferences('1', '2', '3');
