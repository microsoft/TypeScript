/// <reference path="../fourslash.ts"/>

// Global class reference.

// @Filename: /home/src/workspaces/project/referencesForGlobals_1.ts
////class /*0*/globalClass {
////    public f() { }
////}

// @Filename: /home/src/workspaces/project/referencesForGlobals_2.ts
////var c = /*1*/globalClass();

// @Filename: /home/src/workspaces/project/tsconfig.json
////{ "files": ["referencesForGlobals_1.ts", "referencesForGlobals_2.ts"] }

verify.baselineFindAllReferences('1')
