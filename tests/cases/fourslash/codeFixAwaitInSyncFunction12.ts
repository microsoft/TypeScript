/// <reference path='fourslash.ts' />

////const f: () => Array<number | string> = function() {
////    await Promise.resolve([]);
////}

verify.codeFix({
    index: 1,
    description: "Add async modifier to containing function",
    newFileContent:
`const f: () => Promise<Array<number | string>> = async function() {
    await Promise.resolve([]);
}`,
});
