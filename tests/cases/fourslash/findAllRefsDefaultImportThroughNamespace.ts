/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export default function [|{| "isWriteAccess": true, "isDefinition": true |}f|]() {}

// @Filename: /b.ts
////export import a = require("./a");

// @Filename: /c.ts
////import { a } from "./b";
////a.[|default|]();
////
////declare const x: { [|{| "isWriteAccess": true, "isDefinition": true |}default|]: number };
////x.[|default|];

const [r0, r1, r2, r3] = test.ranges();

verify.singleReferenceGroup("function f(): void", [r0, r1]);
verify.singleReferenceGroup("(property) default: number", [r2, r3]);

verify.rangesAreRenameLocations([r0]);

// Can't rename a default import.
goTo.rangeStart(r1);
verify.renameInfoFailed();

// Can rename a default property.
verify.rangesAreRenameLocations([r2, r3]);
