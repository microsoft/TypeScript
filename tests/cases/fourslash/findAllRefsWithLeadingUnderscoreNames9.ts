/// <reference path='fourslash.ts' />

////(function [|{| "isWriteAccess": true, "isDefinition": true |}___foo|]() {
////    [|___foo|]();
////})

verify.singleReferenceGroup("(local function) ___foo(): void");
