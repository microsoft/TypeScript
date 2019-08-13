/// <reference path='fourslash.ts' />

// @Filename: node_modules/foo/index.js
////{}

// @Filename: a.ts
////[|import /*foo*/[|{| "isWriteAccess": true, "isDefinition": true, "contextRangeIndex": 0 |}foo|] from /*fooModule*/"[|{| "isInString": true, "contextRangeIndex": 0 |}foo|]";|]
////[|foo|]();

goTo.file("a.ts");
verify.numberOfErrorsInCurrentFile(0);

goTo.marker("fooModule");
verify.goToDefinitionIs([]);
verify.quickInfoIs("");
const [r00, r0, r1, r2] = test.ranges();
verify.singleReferenceGroup('"foo"', [r1]);

goTo.marker("foo");
verify.goToDefinitionIs("foo");
verify.quickInfoIs("import foo");
verify.singleReferenceGroup("import foo", [r0, r2]);
