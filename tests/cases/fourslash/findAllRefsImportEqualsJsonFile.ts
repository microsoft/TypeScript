/// <reference path='fourslash.ts' />

// @allowJs: true
// @checkJs: true
// @resolveJsonModule: true

// @Filename: /a.ts
////[|import [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}j|] = require("[|{| "contextRangeIndex": 0 |}./j.json|]");|]
////[|j|];

// @Filename: /b.js
////[|const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}j|] = require("[|{| "contextRangeIndex": 4 |}./j.json|]");|]
////[|j|];

// @Filename: /j.json
////[|{ "x": 0 }|]

verify.noErrors();

const [r0Def, r0, r1, r2, r3Def, r3, r4, r5, r6] = test.ranges();
verify.singleReferenceGroup('import j = require("./j.json")', [r0, r2]);
verify.referenceGroups([r1, r4], [{ definition: 'module "/j"', ranges: [r1, r4, r6] }]);
verify.singleReferenceGroup('const j: {\n    "x": number;\n}', [r3, r5]);
verify.referenceGroups(r6, undefined);
