/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export default function [|{| "isWriteAccess": true, "isDefinition": true |}f|]() {}

// @Filename: /b.ts
////export import a = require("./a");

// @Filename: /c.ts
////import { a } from "./b";
////a.[|default|]();

verify.singleReferenceGroup("function f(): void");

const [r0, r1] = test.ranges();

verify.rangesAreRenameLocations([r0]);

goTo.rangeStart(r1);
verify.renameInfoFailed();
