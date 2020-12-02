///<reference path="fourslash.ts" />

// @filename: foo.ts
////export namespace foo {
////    /** @deprecated */
////    export const bar = 1;
////    [|bar|];
////}
////foo.[|bar|];
////foo[[|"bar"|]];

goTo.file('foo.ts');
const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'bar' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[0]
    },
    {
        "code": 6385,
        "message": "'bar' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[1]
    },
    {
        "code": 6385,
        "message": "'bar' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[2]
    },
]);
