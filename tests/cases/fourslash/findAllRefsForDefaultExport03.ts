/// <reference path='fourslash.ts'/>

////function [|f|]() {
////    return 100;
////}
////
////export default [|f|];
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////namespace [|f|] {
////    var local = 100;
////}

verify.rangesReferenceEachOther();
