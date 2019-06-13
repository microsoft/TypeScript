/// <reference path='fourslash.ts'/>

////var x = {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}property|]: {}|]
////};
////
////x.[|property|];
////
////[|let {[|{| "contextRangeIndex": 3 |}property|]: pVar} = x;|]

verify.singleReferenceGroup("(property) property: {}", "property");
