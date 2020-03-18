/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true
// @noEmit: true

// @Filename: a.js
////let x = "";
////x = 1; x = true;
////x = [];

verify.codeFixAll({
    fixId: "disableJsDiagnostics",
    fixAllDescription: ts.Diagnostics.Add_ts_expect_error_to_all_error_messages.message,
    newFileContent:
`let x = "";
// @ts-expect-error
x = 1; x = true;
// @ts-expect-error
x = [];`,
});
