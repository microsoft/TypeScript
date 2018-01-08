/// <reference path='fourslash.ts' />

////const f = (promise) => {
////    await promise;
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`const f = async (promise) => {
    await promise;
}`,
});
