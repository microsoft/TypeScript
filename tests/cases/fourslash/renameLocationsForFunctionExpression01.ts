/// <reference path='fourslash.ts'/>

////var x = [|function [|{| "contextRangeIndex": 0 |}f|](g: any, h: any) {
////    [|f|]([|f|], g);
////}|]

verify.baselineRenameAtRangesWithText("f");
