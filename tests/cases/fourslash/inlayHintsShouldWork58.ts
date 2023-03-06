/// <reference path="fourslash.ts" />

////class Foo {
////    #value = 0;
////    get foo(): number { return this.#value; }
////    set foo(value/**/: number) { this.#value = value; }
////}

verify.getInlayHints([], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
