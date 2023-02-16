/// <reference path='fourslash.ts' />

// @Filename: foo.ts
//// [|export function /*1*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}bar|]() { return "bar"; }|]

//// var x = import("./foo");
//// x.then(foo => {
////     foo./*2*/[|bar|]();
//// })

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ['1', '2'] },
    { type: "findRenameLocations", rangeText: "bar" },
);
