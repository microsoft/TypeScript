/// <reference path='fourslash.ts' />
////let o = { [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}1|]: 12|] };
////let y = o[[|1|]];

verify.singleReferenceGroup("(property) 1: number", test.rangesByText().get("1"));
