/// <reference path='fourslash.ts'/>

// References to an object literal property

////var x = { [|[|{| "isWriteAccess": true, "isDefinition": true, "declarationRangeIndex": 0 |}add|]: 0|], b: "string" };
////x["[|add|]"];
////x.[|add|];
////var y = x;
////y.[|add|];

const [rDef, ...ranges] = test.ranges();
verify.singleReferenceGroup("(property) add: number", ranges);
