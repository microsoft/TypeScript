/// <reference path='fourslash.ts' />

////[|function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}__foo|]() {
////    [|__foo|]();
////}|]

verify.singleReferenceGroup("function __foo(): void", "__foo");
