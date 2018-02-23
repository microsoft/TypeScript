/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: number;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: number = 0;
}`,
    index: 2
})