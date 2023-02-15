/// <reference path="../fourslash.ts"/>

// @Filename: referencesForGlobals_1.ts
////[|var [|{| "contextRangeIndex": 0 |}globalName|] = 0;|]

// @Filename: referencesForGlobals_2.ts
////var y = [|globalName|];

// @Filename: tsconfig.json
////{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }

const [rDef, ...ranges] = test.ranges();
verify.baselineRename(ranges, { findInStrings: true, findInComments: true });
