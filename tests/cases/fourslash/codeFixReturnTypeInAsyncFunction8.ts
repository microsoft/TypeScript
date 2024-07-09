/// <reference path='fourslash.ts' />

// @target: es2015
////async function fn(): symbol {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "symbol", "symbol"],
    newFileContent: `async function fn(): Promise<symbol> {}`
});
