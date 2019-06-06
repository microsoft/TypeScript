/// <reference path='fourslash.ts' />

////[|enum [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}E|] { A }|]
////let e: [|E|].A;

verify.singleReferenceGroup("enum E", "E");
