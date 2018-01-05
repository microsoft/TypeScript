///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////** @typedef {number} */
////const [|{| "isWriteAccess": true, "isDefinition": true |}T|] = 1;

/////** @type {[|T|]} */
////const n = [|T|];

verify.singleReferenceGroup("type T = number\nconst T: 1");
