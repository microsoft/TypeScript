/// <reference path="fourslash.ts" />

// @allowJs: true
// @checkJs: true
// @Filename: /a.js
////class Foo {
////    #value = 0;
////    get foo() { return this.#value; }
////    /**
////     * @param {number} value
////     */
////    set foo(value/**/) { this.#value = value; }
////}

verify.getInlayHints([], undefined, {
    includeInlayFunctionParameterTypeHints: true
});
