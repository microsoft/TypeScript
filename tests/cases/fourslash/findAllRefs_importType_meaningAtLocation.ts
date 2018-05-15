/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = 0;
////export const [|{| "isWriteAccess": true, "isDefinition": true |}T|] = 0;

// @Filename: /b.ts
////const x: import("./a").[|T|] = 0;
////const x: typeof import("./a").[|T|] = 0;

const [r0, r1, r2, r3] = test.ranges();
verify.singleReferenceGroup("type T = 0\nconst T: 0", [r0, r2]);
verify.singleReferenceGroup("type T = 0\nconst T: 0", [r1, r3]);
