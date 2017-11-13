/// <reference path='fourslash.ts' />

// @noUnusedParameters: true
////function greeter(x) {}

verify.codeFix({
    description: "Prefix 'x' with an underscore.",
    index: 1,
    newFileContent: "function greeter(_x) {}",
});
