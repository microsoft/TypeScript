/// <reference path="fourslash.ts" />

// @Filename: /leafModule.ts
////[|export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}hello|] = () => 'Hello';|]

// @Filename: /exporting.ts
////[|export * as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}Leaf|] from './leafModule';|]

// @Filename: /importing.ts
//// [|import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}Leaf|] } from './exporting';|]
//// [|Leaf|].[|hello|]()

verify.noErrors();
const ranges = test.ranges();
const [r0Def, r0, leafDef, leaf, leafImportDef, leafImport, leafUse, r1] = ranges;
verify.singleReferenceGroup("const hello: () => string", [r0, r1]);
const leafExportAsRef = { definition: "import Leaf", ranges: [leaf] };
const leafImportRef = { definition: "import Leaf", ranges: [leafImport, leafUse] };
verify.referenceGroups([leaf], [leafExportAsRef, leafImportRef]);
verify.referenceGroups([leafImport, leafUse], [leafImportRef, leafExportAsRef]);
