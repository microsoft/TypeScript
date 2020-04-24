/// <reference path='fourslash.ts' />

////const f: string = () => {
////    await Promise.resolve('foo');
////}

// should not change type if it's incorrectly set
verify.codeFix({
    index: 2,
    description: "Add async modifier to containing function",
    newFileContent:
`const f: string = async () => {
    await Promise.resolve('foo');
}`
});
