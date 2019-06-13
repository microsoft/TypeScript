/// <reference path='fourslash.ts' />

////[|enum [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}E|] { A }|]
////let e: [|E|].A;

verify.singleReferenceGroup("enum E", "E");
