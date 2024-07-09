/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): PromiseLike<void> {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "PromiseLike<void>", "void"],
    newFileContent: `async function fn(): Promise<void> {}`
});
