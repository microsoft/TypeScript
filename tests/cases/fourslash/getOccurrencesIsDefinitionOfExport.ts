/// <reference path='fourslash.ts' />
// @Filename: m.ts
////export var [|{| "isWriteAccess": true, "isDefinition": true |}x|] = 12;
// @Filename: main.ts
////import { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "./m";
////const y = [|x|];

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
const defs = { definition: "var x: number", ranges: [r0] };
const imports = { definition: "import x", ranges: [r1, r2] };
verify.referenceGroups(r0, [defs, imports]);
verify.referenceGroups([r1, r2], [imports, defs]);
