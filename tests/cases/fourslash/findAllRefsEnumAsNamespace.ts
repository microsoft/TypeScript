/// <reference path='fourslash.ts' />

////enum [|{| "isWriteAccess": true, "isDefinition": true |}E|] { A }
////let e: [|E|].A;

verify.singleReferenceGroup("enum E");
