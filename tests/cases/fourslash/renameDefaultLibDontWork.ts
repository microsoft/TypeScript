/// <reference path='fourslash.ts' />

// Tests that tokens found on the default library are not renamed.
// "test" is a comment on the default library.

// @Filename: file1.ts
//// [|var [|{| "contextRangeIndex": 0 |}test|] = "foo";|]
//// console.log([|test|]);

const [r0Def, ...ranges] = test.ranges();
verify.baselineRename(ranges[0], { findInComments: true, });