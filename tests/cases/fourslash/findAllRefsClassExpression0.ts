/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export = [|class [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}A|] {
////    m() { [|A|]; }
////}|];

// @Filename: /b.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}A|] = require("./a");|]
////[|A|];

const [r0Def, r0, r1, r2Def, r2, r3] = test.ranges();
const defs = { definition: "(local class) A", ranges: [r0, r1] };
const imports = { definition: '(alias) (local class) A\nimport A = require("./a")', ranges: [r2, r3] };
verify.referenceGroups([r0, r1], [defs, imports]);
verify.referenceGroups([r2, r3], [imports, defs]);
