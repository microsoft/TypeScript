/// <reference path='fourslash.ts'/>

////[|function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|]() {
////    return 100;
////}|]
////
////[|export default [|{| "contextRangeIndex": 2 |}f|];|]
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////[|namespace [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 6 |}f|] {
////    var local = 100;
////}|]

verify.singleReferenceGroup("namespace f\nfunction f(): number", "f");
