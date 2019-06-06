/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////[|import { x } from "[|{| "declarationRangeIndex": 0 |}./a|]";|]

// @Filename: /c/sub.js
////[|const a = require("[|{| "declarationRangeIndex": 2 |}../a|]");|]

// @Filename: /d.ts
//// /// <reference path="[|./a.ts|]" />

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
const ranges = [r0, r1, r2];
verify.referenceGroups(ranges, [{ definition: 'module "/a"', ranges: [r0, r1, r2] }]);
// Testing that it works with documentHighlights too
verify.rangesAreDocumentHighlights(ranges);
