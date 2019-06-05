/// <reference path='fourslash.ts' />
////[|var [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}f|] = x => x + 1;|]
////[|f|](12);

verify.singleReferenceGroup("var f: (x: any) => any", "f");
