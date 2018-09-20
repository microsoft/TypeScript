/// <reference path='fourslash.ts' />

// @Filename: declarations.d.ts
////declare module "jquery";

// @Filename: user.ts
////import {[|{| "isWriteAccess": true, "isDefinition": true |}x|]} from "jquery";

// @Filename: user2.ts
////import {[|{| "isWriteAccess": true, "isDefinition": true |}x|]} from "jquery";

const ranges = test.ranges();
const [r0, r1] = ranges;
// TODO: Want these to be in the same group, but that would require creating a symbol for `x`.
verify.singleReferenceGroup("(alias) module \"jquery\"\nimport x", [r0]);
verify.singleReferenceGroup("(alias) module \"jquery\"\nimport x", [r1]);