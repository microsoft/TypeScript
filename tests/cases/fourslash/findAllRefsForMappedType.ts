/// <reference path='fourslash.ts'/>

////interface T { [|{| "isDefinition": true |}a|]: number };
////type U = { [K in keyof T]: string };
////type V = { [K in keyof U]: boolean };
////const u: U = { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: "" }
////const v: V = { [|{| "isWriteAccess": true, "isDefinition": true |}a|]: true }

verify.singleReferenceGroup("(property) T.a: number");
