/// <reference path='fourslash.ts'/>

////var x = function [|f|](g: any, h: any) {
////    [|f|]([|f|], g);
////}

verify.rangesAreRenameLocations();
