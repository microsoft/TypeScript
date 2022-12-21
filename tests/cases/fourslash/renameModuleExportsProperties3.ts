/// <reference path='fourslash.ts' />

// @allowJs: true
// @Filename: a.js
////[|class [|{| "contextRangeIndex": 0 |}A|] {}|]
////module.exports = { [|A|] }

const [r0Def, r0, r1] = test.ranges();
verify.renameLocations(r0, { ranges: [r0, { range: r1, prefixText: "A: " }], providePrefixAndSuffixTextForRename: true });
verify.renameLocations(r1, { ranges: [r0, { range: r1, prefixText: "A: " }], providePrefixAndSuffixTextForRename: true });
