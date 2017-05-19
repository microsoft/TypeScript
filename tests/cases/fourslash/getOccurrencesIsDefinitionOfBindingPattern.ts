/// <reference path='fourslash.ts' />
////const { [|{| "isWriteAccess": true, "isDefinition": true |}x|], y } = { x: 1, y: 2 };
////const z = [|{| "isDefinition": false |}x|];

verify.singleReferenceGroup("const x: number");
