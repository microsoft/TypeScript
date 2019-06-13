/// <reference path='fourslash.ts'/>

////let p, b;
////
////p, [|[{ [|{| "isDefinition": true, "contextRangeIndex": 0 |}a|]: p, b }] = [{ [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}a|]: 10|], b: true }]|];

verify.singleReferenceGroup("(property) a: any", "a");
