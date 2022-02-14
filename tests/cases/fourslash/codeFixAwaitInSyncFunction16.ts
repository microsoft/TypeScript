/// <reference path='fourslash.ts' />

////function foo() {
////    const foo = await(Promise.resolve(1));
////    return foo;
////}

verify.codeFix({
    index: 0,
    description: "Add async modifier to containing function",
    newFileContent:
`async function foo() {
    const foo = await(Promise.resolve(1));
    return foo;
}`,
});
