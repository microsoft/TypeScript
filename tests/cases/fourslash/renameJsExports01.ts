/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////exports.[|area|] = function (r) { return r * r; }

// @Filename: b.js
////var mod = require('./a');
////var t = mod./**/[|area|](10);

verify.singleReferenceGroup("(property) area: (r: any) => number");
verify.rangesAreRenameLocations();
