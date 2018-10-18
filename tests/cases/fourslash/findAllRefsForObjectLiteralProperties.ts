/// <reference path='fourslash.ts'/>

////var x = {
////    [|{| "isWriteAccess": true, "isDefinition": true |}property|]: {}
////};
////
////x.[|property|];
////
////let {[|property|]: pVar} = x;

verify.singleReferenceGroup("(property) property: {}");
