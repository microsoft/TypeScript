/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export {};
////declare global {
////    [|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|](): void;|]
////}

// @Filename: /b.ts
////[|f|]();

verify.noErrors();
verify.singleReferenceGroup("function f(): void", "f");
