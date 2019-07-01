/// <reference path='fourslash.ts'/>

// References to an object literal property

////var x = { [|[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}add|]: 0|], b: "string" };
////x["[|add|]"];
////x.[|add|];
////var y = x;
////y.[|add|];

verify.singleReferenceGroup("(property) add: number", "add");
