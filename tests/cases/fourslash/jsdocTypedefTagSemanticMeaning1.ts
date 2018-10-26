///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////** @typedef {number} */
////var [|{| "isWriteAccess": false, "isDefinition": true |}T|];

/////** @type {[|T|]} */
////const n = 2;

verify.singleReferenceGroup("type T = number");
