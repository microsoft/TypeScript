/// <reference path="../fourslash.ts"/>

// @Filename: referencesForGlobals_1.ts
////var [|globalName|] = 0;

// @Filename: referencesForGlobals_2.ts
////var y = [|globalName|];

// @Filename: tsconfig.json
////{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }

verify.rangesAreRenameLocations({ findInStrings: true, findInComments: true });
