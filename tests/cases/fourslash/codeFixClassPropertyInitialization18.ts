/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string; // comment
//// }

verify.codeFix({
    description: `Add definite assignment assertion to property 'a: string;'`,
    newFileContent: `class T {
    a!: string; // comment
}`,
    index: 1
})
