/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////[|exports.[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}A|] = class {};|]

// @Filename: /b.js
////[|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}A|] } from "./a";|]
////[|A|];

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
const defs = { definition: "(alias) (local class) A\nimport A", ranges: [r0] };
const imports = { definition: "(alias) (local class) A\nimport A", ranges: [r1, r2] };
verify.referenceGroups([r0], [defs, imports]);
verify.referenceGroups([r1, r2], [imports, defs]);
