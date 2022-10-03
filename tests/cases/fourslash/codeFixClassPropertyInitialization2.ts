/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: string;
//// }

verify.codeFix({
    description: `Add definite assignment assertion to property 'a: string;'`,
    newFileContent: `class T {
    a!: string;
}`,
    index: 1
})