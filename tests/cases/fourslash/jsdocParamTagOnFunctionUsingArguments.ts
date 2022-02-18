/// <reference path="fourslash.ts" />
// @strict: true

////class Foo {
////    /**
////     * @param {string} [|foo|]
////     */
////    m(): void {
////        arguments;
////    }
////}

verify.getSuggestionDiagnostics([
    { message: "JSDoc '@param' tag has name 'foo', but there is no parameter with that name. It would match 'arguments' if it had an array type.", code: 8029 },
])
