/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}default|] function [|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|]() {}|]

// @Filename: /b.ts
////export import a = require("./a");

// @Filename: /c.ts
////import { a } from "./b";
////a.[|default|]();
////
////declare const x: { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}default|]: number|] };
////x.[|default|];

const [r0Def, r0, r1, r2, r3Def, r3, r4] = test.ranges();

verify.referenceGroups([r0], [{ definition: "function f(): void", ranges: [r0, r2] }]);
verify.singleReferenceGroup("function f(): void", [r1, r2]);
verify.singleReferenceGroup("(property) default: number", [r3, r4]);

verify.rangesAreRenameLocations([r1]);

// Can't rename a default import.
goTo.rangeStart(r2);
verify.renameInfoFailed();

// Can rename a default property.
verify.rangesAreRenameLocations([r3, r4]);
