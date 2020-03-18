/// <reference path='fourslash.ts' />

// @allowjs: true
// @checkJs: true

// @Filename: /a.js
////{
////    a;
////}

verify.codeFix({
    description: ts.Diagnostics.Ignore_this_error_message.message,
    index: 0,
    newFileContent:
`{
    // @ts-expect-error
    a;
}`,
});
