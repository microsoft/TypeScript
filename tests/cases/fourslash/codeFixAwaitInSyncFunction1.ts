/// <reference path='fourslash.ts' />

////function f() {
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Convert to async",
    index: 0,
    newFileContent:
`async function f() {\r
    await Promise.resolve();\r
}`,
});
