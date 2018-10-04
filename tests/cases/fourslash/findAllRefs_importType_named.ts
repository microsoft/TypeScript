/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = number;
////export type [|{| "isWriteAccess": true, "isDefinition": true |}U|] = string;

// @Filename: /b.ts
////const x: import("./a").[|T|] = 0;
////const x: import("./a").[|U|] = 0;

const [r0, r1, r2, r3] = test.ranges();
verify.singleReferenceGroup("type T = number", [r0, r2]);
verify.singleReferenceGroup("type U = string", [r1, r3]);
