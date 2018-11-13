/// <reference path='fourslash.ts'/>

////let p, b;
////
////p, [{ [|{| "isDefinition": true |}a|]: p, b }] = [{ [|{| "isWriteAccess": true, "isDefinition": true |}a|]: 10, b: true }];

verify.singleReferenceGroup("(property) a: any");
