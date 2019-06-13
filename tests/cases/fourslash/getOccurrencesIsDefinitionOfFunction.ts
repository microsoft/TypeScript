/// <reference path='fourslash.ts' />
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}func|](x: number) {
////}|]
////[|func|](x)

verify.singleReferenceGroup("function func(x: number): void", "func");
