/// <reference path="fourslash.ts" />

// @Filename: a.js
// @allowJs: true
////__foo;/**/

goTo.marker();
verify.completionListContains("__foo", undefined, undefined, "warning");
