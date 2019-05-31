/// <reference path='fourslash.ts'/>

////var x = [|function [|{| "declarationRangeIndex": 0 |}f|](g: any, h: any) {
////    [|f|]([|f|], g);
////}|]

const [rDef, ...rest] = test.ranges();
verify.rangesAreRenameLocations(rest);
