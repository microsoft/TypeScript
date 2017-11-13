/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////(x: number) => {}

verify.codeFix({
    description: "Prefix 'x' with an underscore.",
    index: 1,
    newFileContent: "(_x: number) => {}",
});
