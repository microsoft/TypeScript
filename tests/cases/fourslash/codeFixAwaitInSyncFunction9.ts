/// <reference path='fourslash.ts' />

////class Foo {
////    bar(): string {
////        await Promise.resolve('baz');
////    }
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`class Foo {
    async bar(): Promise<string> {
        await Promise.resolve('baz');
    }
}`,
});
