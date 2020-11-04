/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public "[|{| "isDefinition": true, "contextRangeIndex": 0 |}ss|]": any;|]
////}
////
////var x: Foo;
////x.[|ss|];
////x["[|ss|]"];
////x = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}ss|]": 0|] };
////x = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}ss|]: 0|] };

verify.singleReferenceGroup('(property) Foo["ss"]: any', "ss");
