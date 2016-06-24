/// <reference path='fourslash.ts'/>

////module M {
////    export var [|variable|] = 0;
////
////    // local use
////    var x = [|variable|];
////}
////
////// external use
////M.[|variable|]

verify.rangesReferenceEachOther();
