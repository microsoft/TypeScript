/// <reference path='fourslash.ts' />

////([|function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}___foo|]() {
////    [|___foo|]();
////}|])

verify.singleReferenceGroup("(local function) ___foo(): void", "___foo");
