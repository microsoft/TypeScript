/// <reference path='fourslash.ts' />

////const f = (promise) => {
////    await promise;
////}

verify.codeFix({
    description: "Convert to async",
    index: 0,
    newFileContent:
`const f = async (promise) => {\r
    await promise;\r
}`,
});
