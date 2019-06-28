/// <reference path='fourslash.ts' />
////let o = { [|["[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|]"]: 12|] };
////let y = o.[|foo|];
////let z = o['[|foo|]'];

verify.singleReferenceGroup('(property) ["foo"]: number', "foo");
