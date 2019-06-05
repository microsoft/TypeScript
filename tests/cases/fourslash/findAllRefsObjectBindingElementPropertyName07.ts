/// <reference path='fourslash.ts'/>

////let p, b;
////
////p, [|[{ [|{| "isDefinition": true, "declarationRangeIndex": 0 |}a|]: p, b }] = [{ [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}a|]: 10|], b: true }]|];

verify.singleReferenceGroup("(property) a: any", "a");
