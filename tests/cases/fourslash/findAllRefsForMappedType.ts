/// <reference path='fourslash.ts'/>

////interface T { [|[|{| "isDefinition": true, "contextRangeIndex": 0 |}a|]: number|] };
////type U = { [K in keyof T]: string };
////type V = { [K in keyof U]: boolean };
////const u: U = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 2 |}a|]: ""|] }
////const v: V = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 4 |}a|]: true|] }

verify.singleReferenceGroup("(property) T.a: number", "a");
