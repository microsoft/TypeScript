/// <reference path='fourslash.ts' />

////namespace Foo {
////    export const x = 0;
////}
////
////Foo.test(1, "", { x: 1, y: 1 });

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "test"],
    newFileContent:
`namespace Foo {
    export const x = 0;

    export function test(arg0: number, arg1: string, arg2: { x: number; y: number; }) {
        throw new Error("Function not implemented.");
    }
}

Foo.test(1, "", { x: 1, y: 1 });`
});
