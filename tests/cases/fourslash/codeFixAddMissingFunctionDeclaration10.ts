/// <reference path='fourslash.ts' />

////namespace Foo {
////    export const x = 0;
////}
////
////Foo.test<string, number>();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "test"],
    newFileContent:
`namespace Foo {
    export const x = 0;

    export function test<T, U>() {
        throw new Error("Function not implemented.");
    }
}

Foo.test<string, number>();`
});
