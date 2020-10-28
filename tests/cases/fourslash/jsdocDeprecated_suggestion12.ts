///<reference path="fourslash.ts" />

// @filename: foo.ts
/////**
//// * @deprecated
//// */
////function foo() {};
////function bar(fn: () => void) {
////    fn();
////}
////bar([|foo|]);

goTo.file('foo.ts');
const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'foo' is deprecated",
        "reportsDeprecated": true,
        "range": ranges[0]
    },
]);
