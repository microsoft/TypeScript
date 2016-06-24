/// <reference path='fourslash.ts' />
////var [|{| "isDefinition": true |}f|] = x => x + 1;
////[|{| "isDefinition": false |}f|](12);

verify.rangesReferenceEachOther();
