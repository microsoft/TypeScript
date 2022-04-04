/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     // comment
////     a: string;
//// }

verify.codeFix({
    description: `Add definite assignment assertion to property 'a: string;'`,
    newFileContent: `class T {
    // comment
    a!: string;
}`,
    index: 1
})
