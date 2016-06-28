/// <reference path='fourslash.ts'/>

// @Filename: file1.ts
////var foo = function [|foo|](a = [|foo|](), b = () => [|foo|]) {
////    [|foo|]([|foo|], [|foo|]);
////}

// @Filename: file2.ts
/////// <reference path="file1.ts" />
////foo();

verify.rangesReferenceEachOther();
