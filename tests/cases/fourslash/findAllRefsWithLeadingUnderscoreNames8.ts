/// <reference path='fourslash.ts' />

////(function [|{| "isWriteAccess": true, "isDefinition": true |}__foo|]() {
////    [|__foo|]();
////})

verify.singleReferenceGroup("(local function) __foo(): void");
