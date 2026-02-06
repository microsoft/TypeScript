/// <reference path="fourslash.ts" />

// @checkJs: true
// @allowJs: true

// @Filename: /foo.js
//// // @ts-check
//// const [|/**/foo|] = 1;

goTo.marker("");
verify.renameInfoSucceeded("foo")
