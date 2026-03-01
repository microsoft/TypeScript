/// <reference path="fourslash.ts" />

// @strict: true

////interface Foo {
////    a?: ((e: any) => void);
////}
////
////const foo: Foo = {
////    a: fn
////}

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "fn"],
    newFileContent:
`interface Foo {
    a?: ((e: any) => void);
}

const foo: Foo = {
    a: fn
}

function fn(e: any): void {
    throw new Error("Function not implemented.");
}
`
});
