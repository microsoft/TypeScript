/// <reference path='fourslash.ts'/>

////var x = {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}property|]: {}|]
////};
////
////x.[|property|];
////
////[|let {[|{| "declarationRangeIndex": 3 |}property|]: pVar} = x;|]

verify.singleReferenceGroup("(property) property: {}", "property");
