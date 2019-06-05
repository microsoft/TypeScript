/// <reference path='fourslash.ts' />
////[|enum [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}E|] {
////    First,
////    Second
////}|]
////let first = [|E|].First;

verify.singleReferenceGroup("enum E", "E");
