/// <reference path='fourslash.ts' />
////function f([|{| "isDefinition": true |}x|]: number) {
////  return [|{| "isDefinition": false |}x|] + 1
////}

verify.rangesReferenceEachOther();
