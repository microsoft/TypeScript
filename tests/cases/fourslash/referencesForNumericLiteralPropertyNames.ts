/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public [|{| "isDefinition": true, "contextRangeIndex": 0 |}12|]: any;|]
////}
////
////var x: Foo;
////x[[|12|]];
////x = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}12|]": 0|] };
////x = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}12|]: 0|] };

verify.singleReferenceGroup("(property) Foo[12]: any", "12");
