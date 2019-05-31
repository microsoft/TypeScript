/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////[|exports.[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}area|] = function (r) { return r * r; }|]

// @Filename: b.js
////var mod = require('./a');
////var t = mod./**/[|area|](10);

const [rDef, ...ranges] = test.ranges();
verify.singleReferenceGroup("(property) area: (r: any) => number", ranges);
verify.rangesAreRenameLocations(ranges);
