/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true
// @noEmit: true

// @filename: a.js
////// @ts-check
////let x = "";
////[|x|] = 1;

// verify.codeFixAvailable([
//     { description: ts.Diagnostics.Ignore_this_error_message.message },
//     { description: ts.Diagnostics.Disable_checking_for_this_file.message }
// ]);

verify.codeFix({
    description: ts.Diagnostics.Disable_checking_for_this_file.message,
    index: 1,
    newFileContent:
`// @ts-nocheck
let x = "";
x = 1;`,
});
