/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): null {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "null", "null"],
    newFileContent: `async function fn(): Promise<null> {}`
});
