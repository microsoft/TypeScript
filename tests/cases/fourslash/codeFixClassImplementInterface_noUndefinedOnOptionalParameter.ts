/// <reference path="fourslash.ts" />

////interface IFoo {
////    bar(x?: number | string): void;
////}
////
////class Foo implements IFoo {
////}

//https://github.com/microsoft/TypeScript/issues/39458
verify.codeFix({
    description: [ts.Diagnostics.Implement_all_members_of_interface_0.message, "IFoo"],
    index: 1,
    newFileContent:
`interface IFoo {
    bar(x?: number | string): void;
}

class Foo implements IFoo {
    bar(x?: string | number): void {
        throw new Error("Method not implemented.");
    }
}`,
});
