/// <reference path='fourslash.ts' />
////[|function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}func|](x: number) {
////}|]
////[|func|](x)

verify.singleReferenceGroup("function func(x: number): void", test.rangesByText().get("func"));
