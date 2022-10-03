/// <reference path="fourslash.ts" />

// @allowJs: true

// @Filename: /a.js
/////** @type {{ p: "x" | "y" }} */
////const x = { p: "x"  };
////x.p = "[|/**/|]";

verify.completions({ marker: "", exact: [
    { name: "x", replacementSpan: test.ranges()[0] },
    { name: "y", replacementSpan: test.ranges()[0] }
] });
