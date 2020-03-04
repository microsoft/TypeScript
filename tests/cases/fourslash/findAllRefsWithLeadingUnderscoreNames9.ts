/// <reference path='fourslash.ts' />

////([|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}___foo|]() {
////    [|___foo|]();
////}|])

verify.singleReferenceGroup("(local function) ___foo(): void", "___foo");
