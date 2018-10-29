/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////const b = require("[|./b|]");

// @Filename: /b.js
////[|module|].exports = 0;

verify.singleReferenceGroup('module "/b"')
