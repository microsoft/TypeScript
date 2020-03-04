/// <reference path="fourslash.ts"/>

// @esModuleInterop: true

// @Filename: /abc.d.ts
////declare module "a" {
////    [|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}x|]: number;|]
////}

// @Filename: /b.ts
////import a from "a";
////a.[|x|];

verify.singleReferenceGroup("const x: number", "x");
