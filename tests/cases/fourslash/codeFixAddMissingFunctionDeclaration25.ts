/// <reference path="fourslash.ts" />

////interface Foo {
////    f(type: string, listener: (this: object, type: string) => any): void;
////}
////declare let foo: Foo;
////foo.f("test", fn);

verify.codeFix({
    index: 0,
    description: [ts.Diagnostics.Add_missing_function_declaration_0.message, "fn"],
    newFileContent:
`interface Foo {
    f(type: string, listener: (this: object, type: string) => any): void;
}
declare let foo: Foo;
foo.f("test", fn);

function fn(this: object, type: string) {
    throw new Error("Function not implemented.");
}
`
});
