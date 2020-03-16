/// <reference path='fourslash.ts'/>

////enum E {
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}value1|] = 1|],
////    [|"[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}value2|]" = [|value1|]|],
////    [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 5 |}111|] = 11|]
////}
////
////E.[|value1|];
////E["[|value2|]"];
////E.[|value2|];
////E[[|111|]];

verify.singleReferenceGroup("(enum member) E.value1 = 1", "value1");
verify.singleReferenceGroup("(enum member) E[\"value2\"] = 1", "value2");
verify.singleReferenceGroup("(enum member) E[111] = 11", "111");
