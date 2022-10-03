/// <reference path='fourslash.ts'/>

// References to a property of the apparent type using string indexer

////interface Object {
////    /*1*/toMyString();
////}
////
////var y: Object;
////y./*2*/toMyString();
////
////var x = {};
////x["/*3*/toMyString"]();

verify.baselineFindAllReferences('1', '2', '3');
