/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export const [|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}x|] = 0;|]
////declare const a: typeof import("./a");
////a.[|x|];

verify.singleReferenceGroup("const x: 0", test.rangesByText().get("x"));
