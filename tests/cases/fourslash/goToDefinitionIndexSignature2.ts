/// <reference path='fourslash.ts'/>

// Tests that we don't crash for an index signature with no declaration.

// @allowJs: true

// @Filename: /a.js
////const o = {};
////o.[|/*use*/foo|];

verify.baselineGoToDefinition("use");
