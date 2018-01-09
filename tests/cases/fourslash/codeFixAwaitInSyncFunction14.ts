/// <reference path='fourslash.ts' />

////const f = function(): number {
////    await Promise.resolve(1);
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f = async function(): Promise<number> {
    await Promise.resolve(1);
}`,
});
