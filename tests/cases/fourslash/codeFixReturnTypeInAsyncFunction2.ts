/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): boolean {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "boolean", "boolean"],
    newFileContent: `async function fn(): Promise<boolean> {}`
});
