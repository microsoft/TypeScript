/// <reference path="fourslash.ts" />

// Although services should never actually have this option set, the harness
// allows us to pass it, enabling tests which can verify that certain info
// is not present in the tree.

// @skipJSDocParsing: true

/////** @deprecated */
////function imDeprecated() {}
////[|imDeprecated|]()

/////**
//// * {@see imDeprecated}
//// * @deprecated
//// */
////function imDeprecated2() {}
////[|imDeprecated2|]()

const [, range] = test.ranges();
verify.getSuggestionDiagnostics([
    {
        "code": 6387,
        "message": "The signature '(): void' of 'imDeprecated2' is deprecated.",
        "reportsDeprecated": true,
        "range": range
    },
]);
