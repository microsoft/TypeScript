/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.ts
////export const x = 0;

// @Filename: /b.ts
////import { x } from "[|./a|]";

// @Filename: /c/sub.js
////const a = require("[|../a|]");

// @Filename: /d.ts
//// /// <reference path="[|./a|]" />

verify.noErrors();

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r0, r1], [{ definition: 'module "/a"', ranges: [r0, r2, r1] }]);
// TODO:GH#15736
verify.referenceGroups(r2, undefined);
