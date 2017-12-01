/// <reference path='fourslash.ts'/>

////function f() {
////
////}
////var x = function [|f|](g: any, h: any) {
////
////    let helper = function f(): any { f(); }
////
////    let foo = () => [|f|]([|f|], g);
////}

verify.rangesAreRenameLocations();
