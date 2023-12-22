/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////[|export /*0*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}default|] function /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}f|]() {}|]

// @Filename: /b.ts
////export import a = require("./a");

// @Filename: /c.ts
////import { a } from "./b";
////a./*2*/[|default|]();
////
////declare const x: { [|/*3*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}default|]: number|] };
////x./*4*/[|default|];

const [r0Def, r0, r1, r2, r3Def, r3, r4] = test.ranges();

// Can't rename a default import.
goTo.rangeStart(r2);
verify.renameInfoFailed();

verify.baselineFindAllReferences('0', '1', '2', '3', '4');
verify.baselineRename(r1);
// Can rename a default property.
verify.baselineRename([r3, r4])