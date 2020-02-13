/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/index.d.ts
////export const x = 0;

// @Filename: /b.ts
/////// <reference types="[|foo|]" />
////[|import { x } from "[|{| "contextRangeIndex": 1 |}foo|]";|]
////[|declare module "[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 3 |}foo|]" {}|]

verify.noErrors();
verify.singleReferenceGroup('module "/node_modules/foo/index"', "foo");
