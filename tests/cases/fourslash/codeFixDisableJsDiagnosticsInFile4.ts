/// <reference path='fourslash.ts' />

// @allowjs: true
// @noEmit: true
// @checkJs: true

// @Filename: a.js
////var x = "";
////
////[|"test \
////"; x = 1;|]

// Disable checking for next line
verify.rangeAfterCodeFix(`"test \\
";
// @ts-ignore
x = 1;`, /*includeWhiteSpace*/ false, /*errorCode*/ undefined, /*index*/ 0);

