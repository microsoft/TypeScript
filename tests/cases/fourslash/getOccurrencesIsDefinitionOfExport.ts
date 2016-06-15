/// <reference path='fourslash.ts' />
// @Filename: m.ts
////export var [|{| "isDefinition": true |}x|] = 12;
// @Filename: main.ts
////import { [|{| "isDefinition": true |}x|] } from "./m";
////const y = [|{| "isDefinition": false |}x|];

verify.rangesReferenceEachOther();
