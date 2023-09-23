///<reference path="fourslash.ts" />

// Note: We include the word "foo" in the documentation to test for a bug where
// the `.getChildren()` of the JSDocParameterTag included an identifier at that position with no '.text'.
////interface /*I*/I {}
////
/////**
//// * @param /*use*/[|foo|] I pity the foo
//// */
////function f([|[|/*def*/{| "contextRangeIndex": 1 |}foo|]: I|]) {
////    return /*use2*/[|foo|];
////}

const [r0, r1Def, r1, r2] = test.ranges();
const ranges = [r0, r1, r2];

goTo.marker("use");
verify.quickInfoIs("(parameter) foo: I", "I pity the foo");

verify.baselineCommands(
    { type: "findAllReferences", markerOrRange: ["use", "def", "use2"] },
    { type: "findRenameLocations", markerOrRange: ranges },
    { type: "documentHighlights", markerOrRange: ranges },
    { type: "goToType", markerOrRange: "use" },
    { type: "getDefinitionAtPosition", markerOrRange: "use" },
);
