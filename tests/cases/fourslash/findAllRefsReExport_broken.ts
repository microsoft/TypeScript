/// <reference path='fourslash.ts' />

// @Filename: /a.ts
////export { [|{| "isWriteAccess": true, "isDefinition": true |}x|] };

verify.singleReferenceGroup("export x");
