/// <reference path='fourslash.ts' />

// @target: es2015
////
////interface A {}
////export { A as PublicA };
////async function foo(): A {
////    return {}
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "A", "A"],
    newFileContent: `
interface A {}
export { A as PublicA };
async function foo(): Promise<A> {
    return {}
}`
});
