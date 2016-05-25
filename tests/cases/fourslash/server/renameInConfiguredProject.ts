/// <reference path="../fourslash.ts"/>

// @Filename: referencesForGlobals_1.ts
////var [|globalName|] = 0;

// @Filename: referencesForGlobals_2.ts
////var y = /*1*/[|globalName|];

// @Filename: tsconfig.json
////{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }

goTo.marker("1");
verify.renameLocations(/*findInStrings:*/ true, /*findInComments:*/ true);
