/// <reference path="fourslash.ts" />

// @filename: /a.ts
////interface A {
////    a: number;
////}
////interface B {
////    /** @deprecated */
////    a: string;
////}
////const a: A | B  = { [|a|]: 'a' }
////const b: A | B  = { [|a|]: 1 }

verify.getSuggestionDiagnostics([
    {
        code: 6385,
        message: "'a' is deprecated.",
        reportsDeprecated: true,
        range: test.ranges()[0],
    },
]);
