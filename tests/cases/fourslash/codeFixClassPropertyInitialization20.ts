/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string; // comment
//// }

verify.codeFix({
    description: `Add 'undefined' type to property 'a'`,
    newFileContent: `class T {
    a: string | undefined; // comment
}`,
    index: 0
})
