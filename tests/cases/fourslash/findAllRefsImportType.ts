/// <reference path='fourslash.ts' />

// @allowJs: true

// @Filename: /a.js
////module.exports = 0;
////export type [|{| "isWriteAccess": true, "isDefinition": true |}N|] = number;

// @Filename: /b.js
////type T = import("./a").[|N|];

verify.singleReferenceGroup("type N = number");
