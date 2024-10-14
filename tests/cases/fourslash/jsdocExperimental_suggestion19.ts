///<reference path="fourslash.ts" />

////interface I {
////    /** @experimental */
////    x: number;
////}
////const foo: I = { x: 1, y: 1 };
////foo.[|x|];

const [range] = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 18058,
        "message": "'x' is experimental.",
        "range": range,
        "reportsExperimental": true
    },
]);
