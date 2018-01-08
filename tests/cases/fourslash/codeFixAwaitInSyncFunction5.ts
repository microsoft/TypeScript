/// <reference path='fourslash.ts' />

////class Foo {
////    bar() {
////        await Promise.resolve();
////    }
////}

verify.codeFix({
    description: "Convert to async",
    index: 0,
    newFileContent:
`class Foo {
    async bar() {\r
        await Promise.resolve();\r
    }}`,
});
