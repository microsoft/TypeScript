/// <reference path='fourslash.ts' />
////let o = { [|["[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}foo|]"]: 12|] };
////let y = o.[|foo|];
////let z = o['[|foo|]'];

verify.singleReferenceGroup('(property) ["foo"]: number', test.rangesByText().get("foo"));
