/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true

// @Filename: /a.js
////{
////    a;
////}

verify.codeFix({
    description: "Ignore this error message",
    index: 0,
    newFileContent:
`{
    // @ts-ignore
    a;
}`,
});
