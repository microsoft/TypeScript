/// <reference path='fourslash.ts'/>

// References to a property of the apparent type using string indexer

////interface Object {
////    [|toMyString|]();
////}
////
////var y: Object;
////y.[|toMyString|]();
////
////var x = {};
////x["[|toMyString|]"]();

verify.rangesReferenceEachOther();
