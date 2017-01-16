/// <reference path='fourslash.ts' />
////enum [|{| "isDefinition": true |}E|] {
////    First,
////    Second
////}
////let first = [|{| "isDefinition": false |}E|].First;

verify.rangesReferenceEachOther();
