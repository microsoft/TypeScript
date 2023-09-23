/// <reference path='fourslash.ts'/>

// References to an object literal property

////var x = { /*1*/add: 0, b: "string" };
////x["/*2*/add"];
////x./*3*/add;
////var y = x;
////y./*4*/add;

verify.baselineFindAllReferences('1', '2', '3', '4');
