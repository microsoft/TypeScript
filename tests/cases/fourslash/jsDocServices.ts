///<reference path="fourslash.ts" />

// Note: We include the word "foo" in the documentation to test for a bug where
// the `.getChildren()` of the JSDocParameterTag included an identifier at that position with no '.text'.
////interface /*I*/I {}
////
/////**
//// * @param /*use*/[|foo|] I pity the foo
//// */
////function f([|/*def*/{| "isWriteAccess": true, "isDefinition": true |}foo|]: I) {
////    return [|foo|];
////}

const ranges = test.ranges();
goTo.marker("use");
verify.goToDefinitionIs("def");
verify.goToType("use", "I");

goTo.marker("use");
verify.quickInfoIs("(parameter) foo: I", "I pity the foo");

verify.singleReferenceGroup("(parameter) foo: I");
verify.rangesAreDocumentHighlights();
verify.rangesAreRenameLocations();
