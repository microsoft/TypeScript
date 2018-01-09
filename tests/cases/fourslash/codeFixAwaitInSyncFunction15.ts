/// <reference path='fourslash.ts' />

////const f = (): number[] => {
////    await Promise.resolve([1]);
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f = async (): Promise<number[]> => {
    await Promise.resolve([1]);
}`,
});
