/// <reference path='fourslash.ts'/>

// Global interface reference.

// @Filename: referencesForGlobals_1.ts
////declare module "[|{| "isWriteAccess": true, "isDefinition": true |}foo|]" {
////    var f: number;
////}


// @Filename: referencesForGlobals_2.ts
////import f = require("[|foo|]");

const ranges = test.ranges();
const [r0, r1] = ranges;
verify.referenceGroups(ranges, [{ definition: 'module "foo"', ranges: [r1, r0] }]);
