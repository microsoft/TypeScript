/// <reference path='fourslash.ts' />

// Regression test for https://github.com/Microsoft/TypeScript/issues/23942

// @allowJs: true
// @target: esnext

// @Filename: /a.js
////(o){"

verify.codeFix({
    description: "Remove declaration for: 'o'",
    index: 0,
    newFileContent: '(){"',
});
