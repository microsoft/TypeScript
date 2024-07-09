/// <reference path='fourslash.ts' />
// @allowjs: true

// @Filename: a.js
////class /*classDefinition*/Class {
////    f;
////}
//// export { Class };

// @Filename: b.js
////const { Class } = require("./a");
//// [|/*classAliasDefinition*/Class|];


verify.baselineGoToDefinition("classAliasDefinition");
