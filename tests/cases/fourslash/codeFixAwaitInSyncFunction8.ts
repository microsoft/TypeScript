/// <reference path='fourslash.ts' />

////function f(): number | string {
////    await Promise.resolve(8);
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`async function f(): Promise<number | string> {
    await Promise.resolve(8);
}`,
});
