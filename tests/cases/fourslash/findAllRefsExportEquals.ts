/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|type [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}T|] = number;|]
////[|[|{| "declarationRangeIndex": 2 |}export|] = [|{| "declarationRangeIndex": 2 |}T|];|]

// @Filename: /b.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 5 |}T|] = require("[|./a|]");|]

const [r0Def, r0, r12Def, r1, r2, r3Def, r3, r4] = test.ranges();
const mod = { definition: 'module "/a"', ranges: [r4, r1] };
const a = { definition: "type T = number", ranges: [r0, r2] };
const b = { definition: '(alias) type T = number\nimport T = require("./a")', ranges: [r3] };
verify.referenceGroups([r0, r2], [a, b]);
verify.referenceGroups(r3, [b, a]);
verify.referenceGroups(r4, [mod, a, b]);
verify.referenceGroups(r1, [mod]);
