/// <reference path='fourslash.ts' />
////let o = { ["[|{| "isWriteAccess": true, "isDefinition": true |}foo|]"]: 12 };
////let y = o.[|foo|];
////let z = o['[|foo|]'];

verify.singleReferenceGroup('(property) ["foo"]: number');
