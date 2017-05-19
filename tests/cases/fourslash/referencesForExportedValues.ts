/// <reference path='fourslash.ts'/>

////module M {
////    export var [|{| "isWriteAccess": true, "isDefinition": true |}variable|] = 0;
////
////    // local use
////    var x = [|variable|];
////}
////
////// external use
////M.[|variable|]

verify.singleReferenceGroup("var M.variable: number");
