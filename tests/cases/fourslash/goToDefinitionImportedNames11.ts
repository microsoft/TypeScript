/// <reference path='fourslash.ts' />
// @allowjs: true

// @Filename: a.js
//// class Class {
////     f;
//// }
//// module.exports = { /*classDefinition*/Class };

// @Filename: b.js
////const { Class } = require("./a");
//// [|/*classAliasDefinition*/Class|];


verify.goToDefinition("classAliasDefinition", "classDefinition");
