///<reference path="fourslash.ts" />

// @warningOnDeprecated: true
//// /**
////  * @deprecated
////  */
//// interface I {
////     /**
////      * @deprecated
////      */
////     f: string
//// }
//// /**
////  * @deprecated
////  */
//// const a = "foo"
//// declare const b: [|I|]
//// [|a|].toLocaleLowerCase();
//// b.[|f|].toLocaleLowerCase();

const ranges = test.ranges();

verify.getWarningDiagnostics([
    {
        message: "'I' is deprecated",
        code: 6385,
        range: ranges[0],
        category: "warning",
        reportsDeprecated: true,
    },
    {
        message: "'a' is deprecated",
        code: 6385,
        range: ranges[1],
        category: "warning",
        reportsDeprecated: true
    },
    {
        message: "'f' is deprecated",
        code: 6385,
        range: ranges[2],
        category: "warning",
        reportsDeprecated: true,
    }
])