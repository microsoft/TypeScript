/// <reference path='fourslash.ts' />

////const f: string = () => {
////    await Promise.resolve('foo');
////}

// should not change type if it's incorrectly set
verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f: string = async () => {
    await Promise.resolve('foo');
}`,
});
