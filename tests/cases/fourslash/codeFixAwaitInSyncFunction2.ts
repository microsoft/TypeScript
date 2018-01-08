/// <reference path='fourslash.ts' />

////const f = function() {
////    await Promise.resolve();
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Convert to async",
    index: 0,
    newFileContent:
`const f = async function() {\r
    await Promise.resolve();\r
    await Promise.resolve();\r
}`,
});
