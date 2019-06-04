/// <reference path='fourslash.ts' />
////[|type [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}Alias|]= number;|]
////let n: [|Alias|] = 12;

verify.singleReferenceGroup("type Alias = number", test.rangesByText().get("Alias"));
