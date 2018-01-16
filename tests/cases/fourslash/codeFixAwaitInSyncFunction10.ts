/// <reference path='fourslash.ts' />

////const f: () => number | string = () => {
////    await Promise.resolve('foo');
////}

verify.codeFix({
    description: "Add async modifier to containing function",
    newFileContent:
`const f: () => Promise<number | string> = async () => {
    await Promise.resolve('foo');
}`,
});
