/// <reference path='fourslash.ts'/>

////var x = [|function [|{| "declarationRangeIndex": 0 |}f|](g: any, h: any) {
////    [|f|]([|f|], g);
////}|]

verify.rangesWithSameTextAreRenameLocations("f");
