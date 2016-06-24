/// <reference path='fourslash.ts'/>

// References to an object literal property

////var x = { [|add|]: 0, b: "string" };
////x["[|add|]"];
////x.[|add|];
////var y = x;
////y.[|add|];

verify.rangesReferenceEachOther();
