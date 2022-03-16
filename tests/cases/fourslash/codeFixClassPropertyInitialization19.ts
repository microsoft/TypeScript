/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     // comment
////     a: string;
//// }

verify.codeFix({
    description: `Add 'undefined' type to property 'a'`,
    newFileContent: `class T {
    // comment
    a: string | undefined;
}`,
    index: 0
})
