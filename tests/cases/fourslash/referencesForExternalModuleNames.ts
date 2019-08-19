/// <reference path='fourslash.ts'/>

// @Filename: referencesForGlobals_1.ts
////[|declare module "[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|]" {
////    var f: number;
////}|]

// @Filename: referencesForGlobals_2.ts
////[|import f = require("[|{| "contextRangeIndex": 2 |}foo|]");|]

verify.singleReferenceGroup('module "foo"', "foo");
