/// <reference path='fourslash.ts'/>

////class Foo2 {
////    [|get "[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}42|]"() { return 0; }|]
////    [|set [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}42|](n) { }|]
////}
////
////var y: Foo2;
////y[[|42|]];

verify.singleReferenceGroup('(property) Foo2["42"]: number', "42");