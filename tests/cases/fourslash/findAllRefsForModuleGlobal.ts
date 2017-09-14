/// <reference path="fourslash.ts" />

// @Filename: /node_modules/foo/index.d.ts
////export const x = 0;

// @Filename: /b.ts
/////// <reference types="[|foo|]" />
////import { x } from "[|foo|]";
////declare module "[|{| "isWriteAccess": true, "isDefinition": true |}foo|]" {}

verify.noErrors();

const ranges = test.ranges();
const [r0, r1, r2] = ranges;
verify.referenceGroups([r1, r2], [{ definition: 'module "/node_modules/foo/index"', ranges: [r0, r1, r2] }]);
// TODO:GH#15736
verify.referenceGroups(r0, undefined);
