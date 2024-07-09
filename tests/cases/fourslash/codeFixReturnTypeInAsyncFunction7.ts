/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): any {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "any", "any"],
    newFileContent: `async function fn(): Promise<any> {}`
});
