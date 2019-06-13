/// <reference path='fourslash.ts' />
////function f([|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|]: number|]) {
////  return [|x|] + 1
////}

verify.singleReferenceGroup("(parameter) x: number", "x");
