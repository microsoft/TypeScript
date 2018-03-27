/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
/////** @type {{ p: "x" | "y" }} */
////const x = { p: "x"  };
////x.p = "/**/";

// TODO: GH#22907
verify.completionsAt("", ["x", "y"], { isNewIdentifierLocation: true });
