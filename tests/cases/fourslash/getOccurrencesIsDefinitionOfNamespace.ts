/// <reference path='fourslash.ts' />
////namespace [|{| "isDefinition": true |}Numbers|] {
////    export var n = 12;
////}
////let x = [|{| "isDefinition": false |}Numbers|].n + 1;

verify.rangesReferenceEachOther();
