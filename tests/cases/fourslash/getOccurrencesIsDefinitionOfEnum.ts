/// <reference path='fourslash.ts' />
////enum [|{| "isWriteAccess": true, "isDefinition": true |}E|] {
////    First,
////    Second
////}
////let first = [|E|].First;

verify.singleReferenceGroup("enum E");
