/// <reference path='fourslash.ts' />
////function [|{| "isWriteAccess": true, "isDefinition": true |}func|](x: number) {
////}
////[|func|](x)

verify.singleReferenceGroup("function func(x: number): void");
