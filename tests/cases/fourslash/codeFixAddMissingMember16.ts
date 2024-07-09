/// <reference path='fourslash.ts' />

////interface Foo {}
////namespace Foo {
////    export function bar() { }
////}
////Foo.test();

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "test"],
    applyChanges: true,
    newFileContent:
`interface Foo {}
namespace Foo {
    export function bar() { }

    export function test() {
        throw new Error("Function not implemented.");
    }
}
Foo.test();`
});
