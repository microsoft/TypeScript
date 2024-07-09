/// <reference path='fourslash.ts' />

////const f: () => Promise<number | string> = () => {
////    await Promise.resolve('foo');
////}

verify.codeFix({
    index: 2,
    description: "Add async modifier to containing function",
    newFileContent:
`const f: () => Promise<number | string> = async () => {
    await Promise.resolve('foo');
}`,
});
