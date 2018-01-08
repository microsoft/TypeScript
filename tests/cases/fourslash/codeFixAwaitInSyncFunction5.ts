/// <reference path='fourslash.ts' />

////class Foo {
////    bar() {
////        await Promise.resolve();
////    }
////}

verify.codeFix({
    description: "Convert to async",
    newFileContent:
`class Foo {
    async bar() {
        await Promise.resolve();
    }
}`,
});
