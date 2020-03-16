/// <reference path='fourslash.ts' />
////let o = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}1|]: 12|] };
////let y = o[[|1|]];

verify.singleReferenceGroup("(property) 1: number", "1");
