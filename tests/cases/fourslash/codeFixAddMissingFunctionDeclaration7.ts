/// <reference path='fourslash.ts' />

////namespace Foo {
////    export const x = 0;
////}
////
////Foo.test();
////Foo.test();
////Foo.test();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "test"],
    applyChanges: true,
    newFileContent:
`namespace Foo {
    export const x = 0;

    export function test() {
        throw new Error("Function not implemented.");
    }
}

Foo.test();
Foo.test();
Foo.test();`
});

verify.not.codeFixAvailable();
