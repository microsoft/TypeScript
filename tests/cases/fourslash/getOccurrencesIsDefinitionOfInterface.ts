/// <reference path='fourslash.ts' />
////interface [|{| "isDefinition": true |}I|] {
////    p: number;
////}
////let i: [|{| "isDefinition": false |}I|] = { p: 12 };

verify.rangesReferenceEachOther();
