/// <reference path='fourslash.ts'/>

////function [|{| "isWriteAccess": true, "isDefinition": true |}f|]() {
////    return 100;
////}
////
////export default [|f|];
////
////var x: typeof [|f|];
////
////var y = [|f|]();
////
////namespace [|{| "isWriteAccess": true, "isDefinition": true |}f|] {
////    var local = 100;
////}

verify.singleReferenceGroup("namespace f\nfunction f(): number");
