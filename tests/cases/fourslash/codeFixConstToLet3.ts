/// <reference path='fourslash.ts' />

////for (const i = 0; i < 10; i++) {}

verify.codeFix({
    description: "Convert 'const' to 'let'",
    index: 0,
    newFileContent: `for (let i = 0; i < 10; i++) {}`
});
