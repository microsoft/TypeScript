/// <reference path='fourslash.ts' />
////[|interface [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}I|] {
////    p: number;
////}|]
////let i: [|I|] = { p: 12 };

verify.singleReferenceGroup("interface I", "I");
