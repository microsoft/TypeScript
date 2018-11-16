/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}x|] } from "nonsense";

verify.singleReferenceGroup("export x");
