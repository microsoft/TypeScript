/// <reference path='fourslash.ts' />

////function f(): number | string {
////    await Promise.resolve(8);
////}

verify.codeFix({
    index: 1,
    description: "Add async modifier to containing function",
    newFileContent:
`async function f(): Promise<number | string> {
    await Promise.resolve(8);
}`,
});
