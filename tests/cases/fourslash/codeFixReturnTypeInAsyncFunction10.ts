/// <reference path='fourslash.ts' />

// @target: es2015
////type Foo = "a" | "b";
////async function fn(): Foo {}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Replace_0_with_Promise_1.message, "Foo", "Foo"],
    newFileContent:
`type Foo = "a" | "b";
async function fn(): Promise<Foo> {}`
});
