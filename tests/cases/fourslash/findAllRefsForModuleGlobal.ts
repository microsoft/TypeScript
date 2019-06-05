/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/index.d.ts
////export const x = 0;

// @Filename: /b.ts
/////// <reference types="[|foo|]" />
////import { x } from "[|foo|]";
////[|declare module "[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 2 |}foo|]" {}|]

verify.noErrors();
verify.singleReferenceGroup('module "/node_modules/foo/index"', "foo");
