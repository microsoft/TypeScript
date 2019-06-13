/// <reference path='fourslash.ts' />

////([|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}__foo|]() {
////    [|__foo|]();
////}|])

verify.singleReferenceGroup("(local function) __foo(): void", "__foo");
