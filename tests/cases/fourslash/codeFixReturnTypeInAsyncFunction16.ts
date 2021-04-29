/// <reference path='fourslash.ts' />

// @target: es2015
////class A {
////    async foo(): number {}
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "number", "number"],
    newFileContent:
`class A {
    async foo(): Promise<number> {}
}`
});
