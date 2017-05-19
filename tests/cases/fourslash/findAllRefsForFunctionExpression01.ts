/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
////var foo = function [|{| "isWriteAccess": true, "isDefinition": true |}foo|](a = [|foo|](), b = () => [|foo|]) {
////    [|foo|]([|foo|], [|foo|]);
////}

// @Filename: file2.ts
/////// <reference path="file1.ts" />
////foo();

verify.singleReferenceGroup("(local function) foo(a?: void, b?: () => (a?: void, b?: any) => void): void");
