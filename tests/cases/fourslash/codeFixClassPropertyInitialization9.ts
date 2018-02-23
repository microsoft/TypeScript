/// <reference path='fourslash.ts' />

// @strict: true

//// class T {
////     a: 1 | 2;
//// }

verify.codeFix({
    description: `Add initializer to property 'a'`,
    newFileContent: `class T {
    a: 1 | 2 = 1;
}`,
    index: 2
})