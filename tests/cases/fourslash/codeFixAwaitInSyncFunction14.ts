/// <reference path='fourslash.ts' />

////const f = function(): number {
////    await Promise.resolve(1);
////}

verify.codeFix({
    index: 1,
    description: "Add async modifier to containing function",
    newFileContent:
`const f = async function(): Promise<number> {
    await Promise.resolve(1);
}`,
});
