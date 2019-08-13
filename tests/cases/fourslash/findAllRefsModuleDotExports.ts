/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////[|const b = require("[|{| "contextRangeIndex": 0 |}./b|]");|]

// @Filename: /b.js
////[|[|{| "contextRangeIndex": 2 |}module|].exports = 0;|]

const [r0Def, r0, rDef, r1] = test.ranges();
verify.singleReferenceGroup('module "/b"', [r0, r1]);
