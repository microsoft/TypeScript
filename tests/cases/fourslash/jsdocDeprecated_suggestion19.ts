///<reference path="fourslash.ts" />

////interface I {
////    x: number;
////    y: number;
////}
////interface I {
////    /** @deprecated  */
////    x: number;
////}
////const foo: I = { [|x|]: 1, y: 1 };
////foo.[|x|];

verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'x' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[0]
    },
    {
        "code": 6385,
        "message": "'x' is deprecated.",
        "reportsDeprecated": true,
        "range": test.ranges()[1]
    },
]);
