/// <reference path='fourslash.ts' />

////function f() {
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`async function f() {
    await Promise.resolve();
}`,
});
