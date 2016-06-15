/// <reference path='fourslash.ts' />
////const { [|{| "isDefinition": true |}x|], y } = { x: 1, y: 2 };
////const z = [|{| "isDefinition": false |}x|];

verify.rangesReferenceEachOther();
