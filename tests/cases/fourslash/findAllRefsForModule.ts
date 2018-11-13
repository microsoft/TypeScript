/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////import { x } from "[|./a|]";

// @Filename: /c/sub.js
////const a = require("[|../a|]");

// @Filename: /d.ts
//// /// <reference path="[|./a.ts|]" />

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups(ranges, [{ definition: 'module "/a"', ranges: [r0, r1, r2] }]);
// Testing that it works with documentHighlights too
verify.rangesAreDocumentHighlights();
