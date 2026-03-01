//// class C {
////     /** @deprecated getter deprecated */
////     get value() { return 1; }
////     set value(v: number) { void v; }
//// }
//// const c = new C();
//// c.[|value|];
//// c.[|value|] = 2;
////
//// class D {
////     get other() { return 1; }
////     /** @deprecated setter deprecated */
////     set other(v: number) { void v; }
//// }
//// const d = new D();
//// d.[|other|];
//// d.[|other|] = 3;

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        message: "'value' is deprecated.",
        code: 6385,
        range: ranges[0],
        reportsDeprecated: true,
    },
    {
        message: "'value' is deprecated.",
        code: 6385,
        range: ranges[1],
        reportsDeprecated: true,
    },
    {
        message: "'other' is deprecated.",
        code: 6385,
        range: ranges[2],
        reportsDeprecated: true,
    },
    {
        message: "'other' is deprecated.",
        code: 6385,
        range: ranges[3],
        reportsDeprecated: true,
    },
]);
