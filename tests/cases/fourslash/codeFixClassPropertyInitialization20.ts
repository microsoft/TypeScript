/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: 2; // comment
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: 2 = 2; // comment
}`,
    index: 2
})
