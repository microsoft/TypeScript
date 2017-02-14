/// <reference path='fourslash.ts' />
// @Filename: m.ts
////export var [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 12;
// @Filename: main.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "./m";
////const y = [|x|];

verify.singleReferenceGroup("var x: number");
