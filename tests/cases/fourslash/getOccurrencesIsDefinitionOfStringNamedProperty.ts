/// <reference path='fourslash.ts' />
////let o = { "[|{| "isWriteAccess": true, "isDefinition": true |}x|]": 12 };
////let y = o.[|x|];

verify.singleReferenceGroup('(property) "x": number');
