/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true

// @Filename: index.js
//// const almanac = 0;
//// module.exports = {
////   a/**/
//// };

verify.completions({
  marker: "",
  isNewIdentifierLocation: true,
  includes: "almanac",
  excludes: "a",
});
