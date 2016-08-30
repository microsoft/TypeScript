/// <reference path='fourslash.ts' />
////let o = { ["/**/[|{| "isDefinition": true |}foo|]"]: 12 };
////let y = o.[|{| "isDefinition": false |}foo|];
////let z = o['[|{| "isDefinition": false |}foo|]'];

goTo.marker();
verify.referencesAre(test.ranges());
