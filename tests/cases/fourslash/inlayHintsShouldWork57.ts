/// <reference path="fourslash.ts" />

////class Foo {
////    #value = 0;
////    get foo(): number { return this.#value; }
////    set foo(value) { this.#value = value; }
////}

verify.baselineInlayHints(undefined, {
    includeInlayFunctionParameterTypeHints: true
});
