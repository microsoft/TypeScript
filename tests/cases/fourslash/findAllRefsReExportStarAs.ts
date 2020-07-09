/// <reference path="fourslash.ts" />

// @Filename: /leafModule.ts
////[|{| "id": "helloDecl" |}export const [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "helloDecl" |}hello|] = () => 'Hello';|]

// @Filename: /exporting.ts
////[|{| "id": "leafExportDecl" |}export * as [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "leafExportDecl" |}Leaf|] from './leafModule';|]

// @Filename: /importing.ts
//// [|{| "id": "leafImportDecl" |}import { [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeId": "leafImportDecl" |}Leaf|] } from './exporting';|]
//// [|Leaf|].[|hello|]()

verify.noErrors();
const ranges = test.ranges();
const [helloDecl, helloDef, leafExportDecl, leafDef, leafImportDecl, leafImportDef, leafUse, helloUse] = ranges;
verify.singleReferenceGroup("const hello: () => string", [helloDef, helloUse]);
const leafExportAsRef = { definition: "import Leaf", ranges: [leafDef] };
const leafImportRef = { definition: "import Leaf", ranges: [leafImportDef, leafUse] };
verify.referenceGroups([leafDef], [leafExportAsRef, leafImportRef]);
verify.referenceGroups([leafImportDef, leafUse], [leafImportRef, leafExportAsRef]);
