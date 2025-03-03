/// <reference path="fourslash.ts" />

// @filename: /a.ts
////type I = {
////    /**
////     * @deprecated
////     */
////    text: string;
////} | {
////    text: { a: string; b: string };
////};
////
////const a: I = { [|text|]: "" };
////a.[|text|];

verify.getSuggestionDiagnostics([
    {
        code: 6385,
        message: "'text' is deprecated.",
        reportsDeprecated: true,
        range: test.ranges()[0]
    },
    {
        code: 6385,
        message: "'text' is deprecated.",
        reportsDeprecated: true,
        range: test.ranges()[1]
    },
]);
