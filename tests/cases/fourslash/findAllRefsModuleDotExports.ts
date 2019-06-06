/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////[|const b = require("[|{| "declarationRangeIndex": 0 |}./b|]");|]

// @Filename: /b.js
////[|[|{| "declarationRangeIndex": 2 |}module|].exports = 0;|]

const [r0Def, r0, rDef, r1] = test.ranges();
verify.singleReferenceGroup('module "/b"', [r0, r1]);
