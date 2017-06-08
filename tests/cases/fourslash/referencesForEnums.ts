/// <reference path='fourslash.ts'/>

////enum E {
////    [|{| "isWriteAccess": true, "isDefinition": true |}value1|] = 1,
////    "[|{| "isWriteAccess": true, "isDefinition": true |}value2|]" = [|value1|],
////    [|{| "isWriteAccess": true, "isDefinition": true |}111|] = 11
////}
////
////E.[|value1|];
////E["[|value2|]"];
////E.[|value2|];
////E[[|111|]];

const r = test.rangesByText();
verify.singleReferenceGroup("(enum member) E.value1 = 1", r.get("value1"));
verify.singleReferenceGroup("(enum member) E[\"value2\"] = 1", r.get("value2"));
verify.singleReferenceGroup("(enum member) E[111] = 11", r.get("111"));
