/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): PromiseLike<string> {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "PromiseLike<string>", "string"],
    newFileContent: `async function fn(): Promise<string> {}`
});
