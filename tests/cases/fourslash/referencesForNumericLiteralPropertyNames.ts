/// <reference path='fourslash.ts'/>

////class Foo {
////    [|public [|{| "isDefinition": true, "declarationRangeIndex": 0 |}12|]: any;|]
////}
////
////var x: Foo;
////x[[|12|]];
////x = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 3 |}12|]": 0|] };
////x = { [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 5 |}12|]: 0|] };

verify.singleReferenceGroup("(property) Foo[12]: any", test.rangesByText().get("12"));
