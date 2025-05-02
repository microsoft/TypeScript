/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
////let obj = {};
////
////Object.defineProperty(obj, `[|prop|]`, { value: 0 });
////
////obj = {
////    [|[`[|{| "contextRangeIndex": 1 |}prop|]`]: 1|]
////};
////
////obj.[|prop|];
////obj['[|prop|]'];
////obj["[|prop|]"];
////obj[`[|prop|]`];

verify.baselineRenameAtRangesWithText('prop');
