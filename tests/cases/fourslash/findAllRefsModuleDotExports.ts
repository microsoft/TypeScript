/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const b = require("[|./b|]");

// @Filename: /b.js
////[|[|{| "declarationRangeIndex": 1 |}module|].exports = 0;|]

const [r0, rDef, r1] = test.ranges();
verify.singleReferenceGroup('module "/b"', [r0, r1]);
