/// <reference path='fourslash.ts' />

////function [|{| "isWriteAccess": true, "isDefinition": true |}__foo|]() {
////    [|__foo|]();
////}

verify.singleReferenceGroup("function __foo(): void");
