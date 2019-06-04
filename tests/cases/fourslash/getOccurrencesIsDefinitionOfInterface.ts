/// <reference path='fourslash.ts' />
////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}I|] {
////    p: number;
////}|]
////let i: [|I|] = { p: 12 };

verify.singleReferenceGroup("interface I", test.rangesByText().get("I"));
