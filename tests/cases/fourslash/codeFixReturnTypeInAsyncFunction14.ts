/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): string | symbol {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "string | symbol", "string | symbol"],
    newFileContent: `async function fn(): Promise<string | symbol> {}`
});
