/// <reference path='fourslash.ts'/>

// References to a property of the apparent type using string indexer

////interface Object {
////    [|{| "isDefinition": true |}toMyString|]();
////}
////
////var y: Object;
////y.[|toMyString|]();
////
////var x = {};
////x["[|toMyString|]"]();

verify.singleReferenceGroup("(method) Object.toMyString(): any");
