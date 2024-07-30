/// <reference path="fourslash.ts" />

////interface IFoo {
////    bar(x?: number | string): void;
////}
////
////class Foo implements IFoo {
////}

//https://github.com/microsoft/TypeScript/issues/39458
verify.codeFix({
    description: [ts.Diagnostics.Implement_interface_0.message, "IFoo"],
    newFileContent:
`interface IFoo {
    bar(x?: number | string): void;
}

class Foo implements IFoo {
    bar(x?: number | string): void {
        throw new Error("Method not implemented.");
    }
}`,
});
