/// <reference path='fourslash.ts' />

////const f: () => Array<number | string> = function() {
////    await Promise.resolve([]);
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f: () => Promise<Array<number | string>> = async function() {
    await Promise.resolve([]);
}`,
});
