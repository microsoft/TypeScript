/// <reference path='fourslash.ts' />

////const f: () => Promise<number | string> = () => {
////    await Promise.resolve('foo');
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f: () => Promise<number | string> = async () => {
    await Promise.resolve('foo');
}`,
});
