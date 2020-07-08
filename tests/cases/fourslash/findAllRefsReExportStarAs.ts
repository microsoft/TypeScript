/// <reference path="fourslash.ts" />

// @Filename: /leafModule.ts
////[|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}hello|] = () => 'Hello';|]

// @Filename: /exporting.ts
////export * as Leaf from './leafModule';

// @Filename: /importing.ts
//// import { Leaf } from './exporting';
//// Leaf.[|hello|]()

verify.noErrors();
const ranges = test.ranges();
const [r0Def, r0, r1] = ranges;
verify.singleReferenceGroup("const hello: () => string", [r0, r1]);