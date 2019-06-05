/// <reference path='fourslash.ts'/>

////[|function [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}f|]() {
////    return 100;
////}|]
////
////[|export default [|{| "declarationRangeIndex": 2 |}f|];|]
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////[|namespace [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 6 |}f|] {
////    var local = 100;
////}|]

verify.singleReferenceGroup("namespace f\nfunction f(): number", "f");
