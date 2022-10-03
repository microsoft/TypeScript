/// <reference path='fourslash.ts' />

////class Foo {
////    bar() {
////        await Promise.resolve();
////    }
////}

verify.codeFix({
    description: "Add async modifier to containing function",
    newFileContent:
`class Foo {
    async bar() {
        await Promise.resolve();
    }
}`,
});
