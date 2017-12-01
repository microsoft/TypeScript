/// <reference path='fourslash.ts' />

// @Filename: /node_modules/foo/index.d.ts
////export type [|{| "isWriteAccess": true, "isDefinition": true |}T|] = number;

// @Filename: /a.ts
////import * as foo from "foo";
////declare module "foo" {
////    export const x: [|T|];
////}

verify.noErrors();
verify.singleReferenceGroup("type T = number");
