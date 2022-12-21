/// <reference path='fourslash.ts' />

// @target: es2015
////const foo = async (): number => {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "number", "number"],
    newFileContent: `const foo = async (): Promise<number> => {}`
});
