/// <reference path='fourslash.ts' />
////let o = { [|"[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}x|]": 12|] };
////let y = o.[|x|];

verify.singleReferenceGroup('(property) "x": number', test.rangesByText().get("x"));
