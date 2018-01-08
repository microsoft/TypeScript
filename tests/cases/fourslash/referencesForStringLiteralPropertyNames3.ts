/// <reference path='fourslash.ts'/>

////class Foo2 {
////    get "[|{| "isWriteAccess": true, "isDefinition": true |}42|]"() { return 0; }
////    set [|{| "isWriteAccess": true, "isDefinition": true |}42|](n) { }
////}
////
////var y: Foo2;
////y[[|42|]];

verify.singleReferenceGroup('(property) Foo2["42"]: number');
