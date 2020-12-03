/// <reference path='fourslash.ts' />

////class Foo {
////    bar(): string {
////        await Promise.resolve('baz');
////    }
////}

verify.codeFix({
    index: 1,
    description: "Add async modifier to containing function",
    newFileContent:
`class Foo {
    async bar(): Promise<string> {
        await Promise.resolve('baz');
    }
}`,
});
