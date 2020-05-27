/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module "jquery";

// @Filename: user.ts
////[|import {[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|]} from "jquery";|]

// @Filename: user2.ts
////[|import {[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}x|]} from "jquery";|]

const [r0Def, r0, r1Def, r1] = test.ranges();
// TODO: Want these to be in the same group, but that would require creating a symbol for `x`.
verify.singleReferenceGroup("(alias) module \"jquery\"\nimport x", [r0]);
verify.singleReferenceGroup("(alias) module \"jquery\"\nimport x", [r1]);