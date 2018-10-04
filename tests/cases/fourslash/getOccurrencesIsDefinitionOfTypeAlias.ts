/// <reference path='fourslash.ts' />
////type [|{| "isWriteAccess": true, "isDefinition": true |}Alias|]= number;
////let n: [|Alias|] = 12;

verify.singleReferenceGroup("type Alias = number");
