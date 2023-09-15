///<reference path="fourslash.ts" />

////interface I {
////    x: number;
////    y: number;
////}
////interface I {
////    /** @deprecated  */
////    x: number;
////}
////const foo: I = { x: 1, y: 1 };
////foo.[|x|];

const [range] = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'x' is deprecated.",
        "reportsDeprecated": true,
        "range": range
    },
]);
