/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = number;
////[|export|] = [|T|];

// @Filename: /b.ts
////import [|{| "isWriteAccess": true, "isDefinition": true |}T|] = require("[|./a|]");

const [r0, r1, r2, r3, r4] = test.ranges();
const mod = { definition: 'module "/a"', ranges: [r4, r1] };
const a = { definition: "type T = number", ranges: [r0, r2] };
const b = { definition: '(alias) type T = number\nimport T = require("./a")', ranges: [r3] };
verify.referenceGroups([r0, r2], [a, b]);
verify.referenceGroups(r3, [b, a]);
verify.referenceGroups(r4, [mod, a, b]);
verify.referenceGroups(r1, [mod]);
