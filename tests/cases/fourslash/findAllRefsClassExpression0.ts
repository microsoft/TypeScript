/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export = class [|{| "isWriteAccess": true, "isDefinition": true |}A|] {
////    m() { [|A|]; }
////};

// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}A|] = require("./a");
////[|A|];

const [r0, r1, r2, r3] = test.ranges();
const defs = { definition: "(local class) A", ranges: [r0, r1] };
const imports = { definition: '(alias) (local class) A\nimport A = require("./a")', ranges: [r2, r3] };
verify.referenceGroups([r0, r1], [defs, imports]);
verify.referenceGroups([r2, r3], [imports, defs]);
