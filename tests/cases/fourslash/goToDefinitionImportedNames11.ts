/// <reference path='fourslash.ts' />
// @allowjs: true

// @Filename: a.js
//// class /*classDefinition*/Class {
////     f;
//// }
//// module.exports = { Class };

// @Filename: b.js
////const { Class } = require("./a");
//// [|/*classAliasDefinition*/Class|];


verify.baselineGoToDefinition("classAliasDefinition");
