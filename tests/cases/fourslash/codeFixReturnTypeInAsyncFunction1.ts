/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): number {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "number", "number"],
    newFileContent: `async function fn(): Promise<number> {}`
});
