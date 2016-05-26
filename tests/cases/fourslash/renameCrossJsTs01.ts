/// <reference path='fourslash.ts'/>

// @allowJs: true
// @Filename: a.js
////exports.[|area|] = function (r) { return r * r; }

// @Filename: b.ts
////import { [|area|] } from './a';
////var t = /**/[|area|](10);

goTo.marker();
verify.renameLocations( /*findInStrings*/ false, /*findInComments*/ false);