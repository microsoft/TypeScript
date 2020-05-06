/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): string {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "string", "string"],
    newFileContent: `async function fn(): Promise<string> {}`
});
