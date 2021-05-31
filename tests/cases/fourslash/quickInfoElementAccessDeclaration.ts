/// <reference path="fourslash.ts" />

// @checkJs: true
// @allowJs: true
// @Filename: a.js
////const mod = {};
////mod["@@thing1"] = {};
////mod["/**/@@thing1"]["@@thing2"] = 0;

goTo.marker();
verify.quickInfoIs(`module mod["@@thing1"]
(property) mod["@@thing1"]: typeof mod.@@thing1`);
