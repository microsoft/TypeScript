/// <reference path='fourslash.ts' />
////namespace [|{| "isWriteAccess": true, "isDefinition": true |}Numbers|] {
////    export var n = 12;
////}
////let x = [|Numbers|].n + 1;

verify.singleReferenceGroup("namespace Numbers");
