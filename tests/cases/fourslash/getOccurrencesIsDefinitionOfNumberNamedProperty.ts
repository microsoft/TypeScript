/// <reference path='fourslash.ts' />
////let o = { [|{| "isDefinition": true |}1|]: 12 };
////let y = o[[|{| "isDefinition": false |}1|]];

verify.rangesReferenceEachOther();
