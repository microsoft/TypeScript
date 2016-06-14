/// <reference path="fourslash.ts" />

// @Filename: a.js
// @allowJs: true
////___foo; __foo;/**/

goTo.marker();
verify.completionListContains("__foo", undefined, undefined, "warning");
verify.completionListContains("___foo", undefined, undefined, "warning");
