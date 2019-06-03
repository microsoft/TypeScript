/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public "[|{| "isDefinition": true, "declarationRangeIndex": 0 |}ss|]": any;|]
////}
////
////var x: Foo;
////x.[|ss|];
////x["[|ss|]"];
////x = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 4 |}ss|]": 0|] };
////x = { [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 6 |}ss|]: 0|] };

verify.singleReferenceGroup('(property) Foo["ss"]: any', test.rangesByText().get("ss"));
