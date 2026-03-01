/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////[|import { x } from "/*0*/[|{| "contextRangeIndex": 0 |}./a|]";|]

// @Filename: /c/sub.js
////[|const a = require("/*1*/[|{| "contextRangeIndex": 2 |}../a|]");|]

// @Filename: /d.ts
//// /// <reference path="/*2*/[|./a.ts|]" />

const [r0Def, r0, r1Def, r1, r2] = test.ranges();
const ranges = [r0, r1, r2];
// Testing that it works with documentHighlights too
verify.baselineFindAllReferences('0', '1', '2');
verify.baselineDocumentHighlights(ranges, { filesToSearch: ["/b.ts", "/c/sub.js", "/d.ts"] });
