/// <reference path='fourslash.ts' />

////function f() {
////    await Promise.resolve();
////}

verify.codeFix({
    description: "Add async modifier to containing function",
    newFileContent:
`async function f() {
    await Promise.resolve();
}`,
});
