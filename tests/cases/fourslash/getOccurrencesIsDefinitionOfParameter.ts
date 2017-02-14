/// <reference path='fourslash.ts' />
////function f([|{| "isWriteAccess": true, "isDefinition": true |}x|]: number) {
////  return [|x|] + 1
////}

verify.singleReferenceGroup("(parameter) x: number");
