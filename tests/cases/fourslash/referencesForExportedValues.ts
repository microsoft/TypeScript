/// <reference path='fourslash.ts'/>

////module M {
////    [|export var [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}variable|] = 0;|]
////
////    // local use
////    var x = [|variable|];
////}
////
////// external use
////M.[|variable|]

verify.singleReferenceGroup("var M.variable: number", "variable");
