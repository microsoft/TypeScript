/// <reference path='fourslash.ts' />

// @target: es2015
////declare class Thenable { then(): void; }
////async function fn(): Thenable {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "Thenable", "void"],
    newFileContent:
`declare class Thenable { then(): void; }
async function fn(): Promise<void> {}`
});
