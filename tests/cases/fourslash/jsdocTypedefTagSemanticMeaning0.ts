///<reference path="fourslash.ts" />

// @allowJs: true
// @Filename: a.js

/////** @typedef {number} [|{| "isWriteAccess": true, "isDefinition": true |}T|] */

////const [|{| "isWriteAccess": true, "isDefinition": true |}T|] = 1;

/////** @type {[|T|]} */
////const n = [|T|];

const [t0, v0, t1, v1] = test.ranges();

verify.singleReferenceGroup("type T = number\nconst T: 1", [t0, t1]);
verify.singleReferenceGroup("type T = number\nconst T: 1", [v0, v1]);
