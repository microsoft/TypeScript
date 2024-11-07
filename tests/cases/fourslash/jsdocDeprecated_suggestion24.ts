/// <reference path="fourslash.ts" />

// @filename: /a.ts
////type I = {
////    /**
////     * @deprecated
////     */
////    text: string;
////};
////
////function f(i: I) { return i; }
////f({ [|text|]: 'a' });

verify.getSuggestionDiagnostics([
    {
        code: 6385,
        message: "'text' is deprecated.",
        reportsDeprecated: true,
        range: test.ranges()[0]
    },
]);
