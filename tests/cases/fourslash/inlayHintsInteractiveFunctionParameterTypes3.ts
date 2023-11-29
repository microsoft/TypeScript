/// <reference path="fourslash.ts" />

////interface IFoo {
////    bar(x?: boolean): void;
////}
////
////const a: IFoo = {
////    bar: function (x?): void {
////        throw new Error("Function not implemented.");
////    }
////}

////class Foo {
////    #value = 0;
////    get foo(): number { return this.#value; }
////    set foo(value) { this.#value = value; }
////}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true,
    interactiveInlayHints: true
});
