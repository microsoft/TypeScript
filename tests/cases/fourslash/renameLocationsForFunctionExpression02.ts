/// <reference path='fourslash.ts'/>

////function f() {
////
////}
////var x = [|function [|{| "contextRangeIndex": 0 |}f|](g: any, h: any) {
////
////    let helper = function f(): any { f(); }
////
////    let foo = () => [|f|]([|f|], g);
////}|]

verify.baselineRenameAtRangesWithText("f");
