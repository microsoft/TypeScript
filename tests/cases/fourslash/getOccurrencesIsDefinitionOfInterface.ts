/// <reference path='fourslash.ts' />
////interface [|{| "isWriteAccess": true, "isDefinition": true |}I|] {
////    p: number;
////}
////let i: [|I|] = { p: 12 };

verify.singleReferenceGroup("interface I");
