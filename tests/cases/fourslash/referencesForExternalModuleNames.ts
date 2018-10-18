/// <reference path='fourslash.ts'/>

// @Filename: referencesForGlobals_1.ts
////declare module "[|{| "isWriteAccess": true, "isDefinition": true |}foo|]" {
////    var f: number;
////}

// @Filename: referencesForGlobals_2.ts
////import f = require("[|foo|]");

verify.singleReferenceGroup('module "foo"');
