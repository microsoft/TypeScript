/// <reference path="../fourslash.ts"/>

// Global class reference.

// @Filename: /home/src/workspaces/project/referencesForGlobals_1.ts
////class /*0*/globalClass {
////    public f() { }
////}

// @Filename: /home/src/workspaces/project/referencesForGlobals_2.ts
///////<reference path="referencesForGlobals_1.ts" />
////var c = /*1*/globalClass();

verify.baselineFindAllReferences('1')
