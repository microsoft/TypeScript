/// <reference path="fourslash.ts" />

// Tests that @deprecated on getter/setter pairs produces suggestion diagnostics.
// Regression from #41941, reported in #62965.

//// class Test {
////     /** @deprecated */
////     public get test1() { return 0; }
////     public set test1(_value: number) {}
////
////     public get test2() { return 0; }
////     /** @deprecated */
////     public set test2(_value: number) {}
////
////     /** @deprecated */
////     public get test3() { return 0; }
////     /** @deprecated */
////     public set test3(_value: number) {}
////
////     public get test4() { return 0; }
////     public set test4(_value: number) {}
//// }
////
//// const t = new Test();
//// const a = t.[|test1|];
//// const b = t.[|test2|];
//// const c = t.[|test3|];
//// const d = t.test4;

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'test1' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[0],
    },
    {
        "code": 6385,
        "message": "'test2' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[1],
    },
    {
        "code": 6385,
        "message": "'test3' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[2],
    },
]);
