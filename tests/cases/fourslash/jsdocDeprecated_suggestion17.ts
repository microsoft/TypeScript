///<reference path="fourslash.ts" />

// @filename: foo.ts
////interface Foo {
////    /** @deprecated */
////    [k: string]: any;
////    /** @deprecated please use `.y` instead  */
////    x: number;
////    y: number;
////}
////function f(foo: Foo) {
////    foo.[|x|];
////    foo.[|y|];
////    foo.[|z|];
////}

const ranges = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6385,
        "message": "'x' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[0]
    },
    {
        "code": 6385,
        "message": "'z' is deprecated.",
        "reportsDeprecated": true,
        "range": ranges[2]
    },
]);
