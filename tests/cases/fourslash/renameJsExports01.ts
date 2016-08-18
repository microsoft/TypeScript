/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////exports.[|area|] = function (r) { return r * r; }

// @Filename: b.js
////var mod = require('./a');
////var t = mod./**/[|area|](10);

goTo.marker();
verify.renameLocations( /*findInStrings*/ false, /*findInComments*/ false);