/// <reference path='fourslash.ts' />
////let o = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|]": 12|] };
////let y = o.[|x|];

verify.singleReferenceGroup('(property) "x": number', "x");
